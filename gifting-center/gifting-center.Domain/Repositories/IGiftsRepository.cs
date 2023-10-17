using gifting_center.Domain.ViewModels;

namespace gifting_center.Domain.Repositories
{
	public interface IGiftsRepository
	{
		Task<GiftAdd> Add(GiftAdd gift);

		Task<bool> Delete(int id);

		Task<GiftEdit> Edit(GiftEdit gift);

		Task<List<GiftList>> Get();

		Task<GiftList> GetById(int id);

		Task<List<GiftList>> GetGiftsByUserId(int id);
	}
}

