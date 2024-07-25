using API.Models;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Newtonsoft.Json;

namespace API.Services
{
	public class PreferenceService : IPreferenceService
	{
		private readonly IAmazonDynamoDB _dynamoDBClient;
		private const string TableName = "UserPreferences";

		public PreferenceService(IAmazonDynamoDB dynamoDBClient)
		{
			_dynamoDBClient = dynamoDBClient;
		}

		public async Task<IEnumerable<PreferenceBody>> GetPreferencesAsync(string userName)
		{
			var request = new ScanRequest
			{
				TableName = TableName
			};

			var response = await _dynamoDBClient.ScanAsync(request);
			var answer = new List<PreferenceBody>();
			foreach(var item in response.Items)
			{
				var userId = item["UserID"].S;
				if(userId.Equals(userName))
				{
					var preference = JsonConvert.DeserializeObject<Preference>(item["Preference"].S); ;
					var profile = item["Profile"].S;

					answer.Add(new PreferenceBody()
					{
						Preference = preference,
						Profile = profile
					});
				}
			}
			return answer;
		}

		public async Task SetPreferencesAsync(PreferenceBody newPreference, string userName)
		{

			var preferenceAsJson = JsonConvert.SerializeObject(newPreference.Preference);
			var request = new PutItemRequest
			{
				TableName = TableName,
				Item = new Dictionary<string, AttributeValue>
				{
					{ "UserID", new AttributeValue { S = userName } },
					{ "Profile", new AttributeValue { S = newPreference.Profile } },
					{ "Preference", new AttributeValue { S = preferenceAsJson } }
				}
			};

			var response = await _dynamoDBClient.PutItemAsync(request);
			if(response.HttpStatusCode == System.Net.HttpStatusCode.OK) return;

			throw new Exception("Error publishing to DynamoDB");
		}
	}
}
