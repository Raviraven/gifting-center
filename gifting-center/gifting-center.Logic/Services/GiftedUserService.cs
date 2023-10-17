using gifting_center.Logic.Exceptions;
using gifting_center.Logic.Services.Interfaces;
using gifting_center.Logic.Repositories;
using gifting_center.Logic.ViewModels;

namespace gifting_center.Logic.Services
{
    public class GiftedUserService : IGiftedUsersService
    {
        private readonly IGiftedUsersRepository _giftedUsersRepository;

        public GiftedUserService(IGiftedUsersRepository giftedUsersRepository)
        {
            _giftedUsersRepository = giftedUsersRepository;
        }

        public async Task<GiftedUserAdd> Add(GiftedUserAdd giftedUser)
        {
            return await _giftedUsersRepository.Add(giftedUser);
        }

        public async Task<bool> Delete(int id)
        {
            return await _giftedUsersRepository.Delete(id);
        }

        public async Task<GiftedUser> Edit(int id, GiftedUser giftedUser)
        {
            return await _giftedUsersRepository.Edit(id, giftedUser);
        }

        public async Task<List<GiftedUser>> Get()
        {
            var result = await _giftedUsersRepository.GetAll();
            if (result == null || result.Count == 0)
            {
                throw new NoGiftedUserException("No gifted users found");
            }
            return result;
        }

        public async Task<GiftedUser> GetById(int id)
        {
            try
            {
                return await _giftedUsersRepository.GetById(id);
            }
            catch (InvalidOperationException)
            {
                throw new NoGiftedUserException($"There is no gifted user with id: {id}");
            }
        }
    }
}

