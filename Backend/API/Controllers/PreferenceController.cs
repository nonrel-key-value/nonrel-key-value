using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

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
				_logger.LogInformation("Getting preferences.");
				var answer = await _preferenceService.GetPreferencesAsync();
				return Ok(answer); ;
			}
			catch(Exception ex)
			{
				_logger.LogError($"Error getting preferences: {ex.Message}");
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("SetPreferences", Name = "SetPreferences")]
		public async Task<ActionResult<Preference>> UpdatePreferences([FromBody] Preference preference)
		{
			try
			{
				_logger.LogInformation("Setting preferences.");
				var answer = await _preferenceService.SetPreferencesAsync(preference);
				return Ok(answer);
			}
			catch(Exception ex)
			{
				_logger.LogError($"Error setting preferences: {ex.Message}");
				return BadRequest(ex.Message);
			}
		}
	}
}
