using gifting_center.Data.ViewModels;

namespace gifting_center.Data.Repositories.Interfaces
{
	public interface IGiftsRepository
	{
		Task<Gift> Add(Gift gift);

		Task<bool> Delete(int id);

		Task<Gift> Edit(Gift gift);

		Task<List<Gift>> Get();

		Task<Gift> GetById(int id);

		Task<List<Gift>> GetGiftsByUserId(int id);
	}
}

