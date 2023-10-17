using gifting_center.Logic.ViewModels;

namespace gifting_center.Logic.Services.Interfaces
{
    public interface IGiftedUsersService
    {
        Task<GiftedUserAdd> Add(GiftedUserAdd giftedUser);

        Task<bool> Delete(int id);

        Task<GiftedUser> Edit(int id, GiftedUser giftedUser);

        Task<List<GiftedUser>> Get();

        Task<GiftedUser> GetById(int id);
    }
}

