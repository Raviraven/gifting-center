using gifting_center.Data.ViewModels;

namespace gifting_center.Data.Repositories.Interfaces
{
	public interface IGiftedUsersRepository
	{
        Task<GiftedUser> Add(GiftedUser giftedUser);

        Task<bool> Delete(int id);

        Task<GiftedUser> Edit(GiftedUser giftedUser);

        Task<List<GiftedUser>> GetAll();

        Task<GiftedUser> GetById(int id);
    }
}

