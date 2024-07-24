
using API.Services;
using Amazon.DynamoDBv2;
using Microsoft.Extensions.DependencyInjection;

namespace API
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddControllers();
			builder.Services.AddScoped<IPreferenceService, PreferenceService>();

            builder.Services.AddSingleton<IAmazonDynamoDB>(sp =>
			{
              var config = new AmazonDynamoDBConfig
			  {
               RegionEndpoint = Amazon.RegionEndpoint.EUWest1
			  };
         
		    return new AmazonDynamoDBClient(config);
			});

            Console.WriteLine($"AWS_ACCESS_KEY_ID: {Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID")}");
            Console.WriteLine($"AWS_SECRET_ACCESS_KEY: {Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY")}");

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

			app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
			app.Run();
		}
	}
}
