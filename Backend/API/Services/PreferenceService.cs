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

		public async Task<IEnumerable<Preference>> GetPreferencesAsync()
		{
			var request = new ScanRequest
			{
				TableName = TableName
			};

			var response = await _dynamoDBClient.ScanAsync(request);
			var answer = new List<Preference>();
			foreach(var item in response.Items)
			{
				var userId = item["UserID"].S;

				if(!item.ContainsKey("Preference")) throw new Exception("Bad object obtained from DynamoDB");

				var temp = item["Preference"].S;
				var t = JsonConvert.DeserializeObject<Preference>(temp);

				answer.Add(t);
			}
			return answer;
		}

		public async Task<Preference> SetPreferencesAsync(Preference newPreference)
		{
			var preferenceAsJson = JsonConvert.SerializeObject(newPreference);
			var request = new PutItemRequest
			{
				TableName = TableName,
				Item = new Dictionary<string, AttributeValue>
				{
					{ "UserID", new AttributeValue { S = "davidbu@bbd.co.za" } },
					{ "Profile", new AttributeValue { S = "Reading light" } },
					{ "Preference", new AttributeValue { S = preferenceAsJson } }
				}
			};

			await _dynamoDBClient.PutItemAsync(request);

			return newPreference;
		}
	}
}
