using API.Models;

namespace API.Services
{
	public interface IPreferenceService
	{
		IEnumerable<Preference> GetPreferences();
		Preference SetPreferences(Preference newPreference);
	}
}