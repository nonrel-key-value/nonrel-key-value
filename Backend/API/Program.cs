using DotNetEnv;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Runtime;
using Microsoft.Extensions.DependencyInjection;
using API.Services;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Load environment variables from .env file
            DotNetEnv.Env.Load();
			
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddScoped<IPreferenceService, PreferenceService>();

            builder.Services.AddSingleton<IAmazonDynamoDB>(sp =>
            {
                var accessKeyId = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
                var secretAccessKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
                var region = Environment.GetEnvironmentVariable("AWS_REGION");

                if (string.IsNullOrEmpty(accessKeyId) || string.IsNullOrEmpty(secretAccessKey) || string.IsNullOrEmpty(region))
                {
                    throw new InvalidOperationException("AWS credentials or region are not set in environment variables.");
                }

                var credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);
                var config = new AmazonDynamoDBConfig
                {
                    RegionEndpoint = RegionEndpoint.GetBySystemName(region)
                };

                return new AmazonDynamoDBClient(credentials, config);
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
