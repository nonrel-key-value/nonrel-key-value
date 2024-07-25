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
            var request = new ScanRequest
            {
                TableName = TableName
            };

            var response = await dynamoDBClient.ScanAsync(request);

            return response.Items.Select(item => new Preference
            {
                UserID = item.ContainsKey("UserID") ? item["UserID"].S : "DefaultUserID",
                Color = item.ContainsKey("Profile") ? item["Profile"].S : "DefaultColor"
                // Map other properties as needed
            }).ToList();
        }

		public async Task<Preference> SetPreferencesAsync(Preference newPreference)
        {
            var request = new PutItemRequest
            {
                TableName = TableName,
                Item = new Dictionary<string, AttributeValue>
                {
                    { "UserID", new AttributeValue { S = newPreference.UserID } },
                    { "Profile", new AttributeValue { S = newPreference.Color } }
                    // Map other properties as needed
                }
            };

            await dynamoDBClient.PutItemAsync(request);

            return newPreference;
        }

	}
}
