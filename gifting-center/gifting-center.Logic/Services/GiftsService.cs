using gifting_center.Logic.Exceptions;
using gifting_center.Logic.Repositories;
using gifting_center.Logic.Services.Interfaces;
using gifting_center.Logic.ViewModels;


namespace gifting_center.Logic.Services
{
    public class GiftsService : IGiftsService
    {
        private readonly IGiftsRepository _giftsRepository;

        public GiftsService(IGiftsRepository giftsRepository)
        {
            _giftsRepository = giftsRepository;
        }

        public async Task<GiftAdd> Add(GiftAdd gift)
        {
            return await _giftsRepository.Add(gift);
        }

        public async Task<bool> Delete(int id)
        {
            return await _giftsRepository.Delete(id);
        }

        public async Task<GiftEdit> Edit(GiftEdit gift)
        {
            return await _giftsRepository.Edit(gift);
        }

        public async Task<List<GiftList>> Get()
        {
            var result = await _giftsRepository.Get();

            if (result == null || result.Count == 0)
            {
                throw new NoGiftException("No gifts found");
            }

            return result;
        }

        public async Task<GiftList> GetById(int id)
        {
            try
            {
                return await _giftsRepository.GetById(id);
            }
            catch (InvalidOperationException)
            {
                throw new NoGiftException($"There is no gift with id: {id}");
            }
        }

        public async Task<List<GiftList>> GetByUserId(int userId)
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