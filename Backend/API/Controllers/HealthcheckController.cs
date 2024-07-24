using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;

namespace API.Controllers
{

	[ApiController]
	[Route("")]
	public class HealthcheckController : Controller
	{
		private readonly ILogger<HealthcheckController> _logger;

		public HealthcheckController(ILogger<HealthcheckController> logger)
		{
			_logger = logger;
		}

		[HttpGet("", Name = "Healthcheck")]
		public ActionResult<string> Healthcheck()
		{
			try
			{
				_logger.LogInformation("Running healthcheck");
				return Ok("We are a go");
			}
			catch(Exception ex)
			{
				_logger.LogError($"Error getting preferences: {ex.Message}");
				return BadRequest(ex.Message);
			}
		}
	}
}
