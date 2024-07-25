using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.IO;

namespace API.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class PreferenceController : ControllerBase
	{
		private readonly ILogger<PreferenceController> _logger;
		private readonly IPreferenceService _preferenceService;

		public PreferenceController(ILogger<PreferenceController> logger, IPreferenceService preferenceService)
		{
			_logger = logger;
			_preferenceService = preferenceService;
		}

		[HttpGet("GetPreferences", Name = "GetPreferences")]
		public async Task<ActionResult<IEnumerable<Preference>>> GetPreferences()
		{
			try
			{
				var userName = GetUser();
				_logger.LogInformation("Getting preferences.");
				var preferences = await _preferenceService.GetPreferencesAsync(userName);
				return Ok(preferences); ;
			}
			catch(Exception ex)
			{
				_logger.LogError($"Error getting preferences: {ex.Message}");
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("SetPreferences", Name = "SetPreferences")]
		public async Task<ActionResult> UpdatePreferences([FromBody] PreferenceBody body)
		{
			try
			{
				var userName = GetUser();
				_logger.LogInformation("Setting preferences.");
				await _preferenceService.SetPreferencesAsync(body, userName);
				return Ok();
			}
			catch(Exception ex)
			{
				_logger.LogError($"Error setting preferences: {ex.Message}");
				return BadRequest(ex.Message);
			}
		}

		private string GetUser()
		{
			var authHeader = (string)HttpContext.Request.Headers["Authorization"];
			var token = authHeader.Trim().Remove(0, authHeader.IndexOf(' ') + 1);

			var handler = new JwtSecurityTokenHandler();
			var jsonToken = handler.ReadToken(token);
			var tokenS = jsonToken as JwtSecurityToken;
			var email = tokenS.Payload["email"].ToString();

			return email;
		}
	}
}
