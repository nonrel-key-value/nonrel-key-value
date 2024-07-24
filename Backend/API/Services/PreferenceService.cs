using API.Models;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

namespace API.Services
{
	public class PreferenceService : IPreferenceService
	{
		private readonly IAmazonDynamoDB dynamoDBClient;
		private const string TableName = "LocalTest";
		private static readonly Random random = new Random();


		public PreferenceService(IAmazonDynamoDB dynamoDBClient)
		{
			this.dynamoDBClient = dynamoDBClient;
		}

		public async Task<IEnumerable<Preference>> GetPreferencesAsync()
		{
			return Enumerable.Range(1, 5).Select(index => new Preference
			{
				Color = String.Format("#{0:X6}", random.Next(0x1000000))
			}).ToArray();

			var request = new ScanRequest
			{
				TableName = TableName
			};

			var response = await dynamoDBClient.ScanAsync(request);

			return response.Items.Select(item => new Preference
			{
				Color = item["Color"].S
				// Map other properties as needed
			}).ToArray();
		}

		public async Task<Preference> SetPreferencesAsync(Preference newPreference)
		{
			return newPreference;

			var request = new PutItemRequest
			{
				TableName = TableName,
				Item = new Dictionary<string, AttributeValue>
					{
						{ "Color", new AttributeValue { S = newPreference.Color } }
                        // Map other properties as needed
                    }
			};

			await dynamoDBClient.PutItemAsync(request);

			return newPreference;
		}
	}
}
