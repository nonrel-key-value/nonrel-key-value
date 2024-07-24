using API.Models;

namespace API.Services
{
	public interface IPreferenceService
	{
		Task<IEnumerable<Preference>> GetPreferencesAsync();
		Task<Preference> SetPreferencesAsync(Preference newPreference);
	}
}