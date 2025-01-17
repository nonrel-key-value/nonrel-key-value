using DotNetEnv;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Runtime;
using API.Services;

namespace API
{
	public class Program
	{
		public static void Main(string[] args)
		{
			// Load environment variables from .env file
			Env.Load();

			var builder = WebApplication.CreateBuilder(args);
			
			builder.Services.AddCors(options =>
			{
				options.AddPolicy("CORS", builder =>
				{
					builder.WithOrigins(["*"])
						.WithHeaders(["*", "Authorization"])
						.WithMethods([HttpMethods.Get, HttpMethods.Post, HttpMethods.Delete, HttpMethods.Patch, HttpMethods.Put, HttpMethods.Options]).Build();
				});
			});

			// Add services to the container.
			builder.Services.AddControllers();
			builder.Services.AddScoped<IPreferenceService, PreferenceService>();

			builder.Services.AddSingleton<IAmazonDynamoDB>(sp =>
			{
				var accessKeyId = Environment.GetEnvironmentVariable("DYNAMO_KEY");
				var secretAccessKey = Environment.GetEnvironmentVariable("DYNAMO_SECRET");
				var region = "eu-west-1";

				if(string.IsNullOrEmpty(accessKeyId) || string.IsNullOrEmpty(secretAccessKey) || string.IsNullOrEmpty(region))
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
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if(app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}
			
			app.UseCors("CORS");
			app.MapControllers();
			app.UseAuthorization();
			app.Run();
		}
	}
}
