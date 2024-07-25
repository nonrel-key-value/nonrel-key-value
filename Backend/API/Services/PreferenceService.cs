using API.Models;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

namespace API.Services
{
	public class PreferenceService : IPreferenceService
	{
		private readonly IAmazonDynamoDB _dynamoDBClient;
		private const string TableName = "LocalTest";

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

			return response.Items.Select(item => new Preference
			{
				//Color = item["Color"].S
				// Map other properties as needed
			}).ToArray();
		}

		public async Task<Preference> SetPreferencesAsync(Preference newPreference)
		{
			var request = new PutItemRequest
			{
				TableName = TableName,
				Item = new Dictionary<string, AttributeValue>
					{
						//{ "Color", new AttributeValue { S = newPreference.Color } }
                        // Map other properties as needed
                    }
			};

			await _dynamoDBClient.PutItemAsync(request);

			return newPreference;
		}
	}
}
