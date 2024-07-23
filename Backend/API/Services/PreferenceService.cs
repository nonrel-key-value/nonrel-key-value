using API.Models;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
	public class PreferenceService : IPreferenceService
	{
       private readonly IAmazonDynamoDB dynamoDBClient;
       private const string TableName = "PreferencesTB";

	   public PreferenceService(IAmazonDynamoDB dynamoDBClient)
	   {
        this.dynamoDBClient = dynamoDBClient;
       }

	   public async Task<IEnumerable<Preference>> GetPreferences()
       {
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

        public async Task<Preference> SetPreferences(Preference newPreference)
        {
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