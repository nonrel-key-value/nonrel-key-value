using API.Models;

namespace API.Services
{
	public interface IPreferenceService
	{
		Task<IEnumerable<Preference>> GetPreferences();
		Task<Preference> SetPreferences(Preference newPreference);
	}
}