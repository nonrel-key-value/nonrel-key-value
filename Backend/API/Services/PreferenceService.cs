using API.Models;

namespace API.Services
{
	public class PreferenceService : IPreferenceService
	{
		private static readonly Random random = new Random();

		public PreferenceService() { }

		public IEnumerable<Preference> GetPreferences()
		{
			return Enumerable.Range(1, 5).Select(index => new Preference
			{
				Color = String.Format("#{0:X6}", random.Next(0x1000000))
			}).ToArray();
		}

		
		public Preference SetPreferences(Preference newPreference)
		{
			return newPreference;
		}
	}
}
