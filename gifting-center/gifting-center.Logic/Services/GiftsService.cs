using System;
using gifting_center.Data.Extensions;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using gifting_center.Logic.Exceptions;
using gifting_center.Logic.Services.Interfaces;


namespace gifting_center.Logic.Services
{
    public class GiftsService : IGiftsService
    {
        private readonly IGiftsRepository _giftsRepository;

        public GiftsService(IGiftsRepository giftsRepository)
        {
            _giftsRepository = giftsRepository;
        }

        public async Task<Gift> Add(Gift gift)
        {
            return await _giftsRepository.Add(gift);
        }

        public async Task<bool> Delete(string id)
        {
            return await _giftsRepository.Delete(id.ParseId());
        }

        public async Task<Gift> Edit(Gift gift)
        {
            return await _giftsRepository.Edit(gift);
        }

        public async Task<Gift> GetById(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Gift>> GetByUserId(string userId)
        {
            var result = await _giftsRepository.GetGiftsByUserId(userId.ParseId());

            if(result == null || result.Count == 0)
            {
                throw new NoGiftsForUserException($"There are no gifts for given user id: {userId}");
            }

            return result;
        }
    }
}