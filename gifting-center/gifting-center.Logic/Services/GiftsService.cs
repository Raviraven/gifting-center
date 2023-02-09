using gifting_center.Data.Extensions;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using gifting_center.Logic.Exceptions;
using gifting_center.Logic.Services.Interfaces;
using System;


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

        public async Task<bool> Delete(int id)
        {
            return await _giftsRepository.Delete(id);
        }

        public async Task<Gift> Edit(Gift gift)
        {
            return await _giftsRepository.Edit(gift);
        }

        public async Task<List<Gift>> Get()
        {
            var result = await _giftsRepository.Get();

            if (result == null || result.Count == 0)
            {
                throw new NoGiftException("No gifts found");
            }

            return result;
        }

        public async Task<Gift> GetById(int id)
        {
            var result = await _giftsRepository.GetById(id);

            if (result == null)
            {
                throw new NoGiftException($"There is no gift with id: {id}");
            }

            return result;
        }

        public async Task<List<Gift>> GetByUserId(int userId)
        {
            var result = await _giftsRepository.GetGiftsByUserId(userId);

            if (result == null || result.Count == 0)
            {
                throw new NoGiftException($"There are no gifts for given user id: {userId}");
            }

            return result;
        }
    }
}