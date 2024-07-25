using API.Models;

namespace API.Services
{
	public interface IPreferenceService
	{
		Task<IEnumerable<PreferenceBody>> GetPreferencesAsync(string userName);
		Task SetPreferencesAsync(PreferenceBody newPreferenceBody, string userName);
		Task DeletePreferenceAsync(string preferenceName, string userName);
	}
}