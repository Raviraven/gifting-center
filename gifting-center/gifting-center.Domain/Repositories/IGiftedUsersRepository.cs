using gifting_center.Domain.ViewModels;

namespace gifting_center.Domain.Repositories
{
    public interface IGiftedUsersRepository
    {
        Task<GiftedUserAdd> Add(GiftedUserAdd giftedUser);

        Task<bool> Delete(int id);

        Task<GiftedUser> Edit(int id, GiftedUser giftedUser);

        Task<List<GiftedUser>> GetAll();

        Task<GiftedUser> GetById(int id);
    }
}

