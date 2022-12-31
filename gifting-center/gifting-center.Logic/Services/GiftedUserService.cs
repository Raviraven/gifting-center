using System;
using gifting_center.Data.Extensions;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using gifting_center.Logic.Services.Interfaces;

namespace gifting_center.Logic.Services
{
	public class GiftedUserService : IGiftedUsersService
    {
        private readonly IGiftedUsersRepository _giftedUsersRepository;

        public GiftedUserService(IGiftedUsersRepository giftedUsersRepository)
        {
            _giftedUsersRepository = giftedUsersRepository;
        }

        public async Task<GiftedUser> Add(GiftedUser giftedUser)
        {
            return await _giftedUsersRepository.Add(giftedUser);
        }

        public async Task<bool> Delete(int id)
        {
            return await _giftedUsersRepository.Delete(id);
        }

        public async Task<GiftedUser> Edit(GiftedUser giftedUser)
        {
            return await _giftedUsersRepository.Edit(giftedUser);
        }

        public async Task<List<GiftedUser>> Get()
        {
            return await _giftedUsersRepository.GetAll();
        }

        public async Task<GiftedUser> GetById(string id)
        {
            return await _giftedUsersRepository.GetById(id.ParseId());
        }
    }
}

