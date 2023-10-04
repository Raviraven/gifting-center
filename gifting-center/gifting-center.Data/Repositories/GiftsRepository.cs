using gifting_center.Data.Database;
using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace gifting_center.Data.Repositories
{
    public class GiftsRepository : IGiftsRepository
    {
        protected readonly PostgresSqlContext _context;

        public GiftsRepository(PostgresSqlContext context)
        {
            _context = context;
        }

        public async Task<GiftAdd> Add(GiftAdd gift)
        {
            await _context.Gifts.AddAsync(new GiftEntity()
            {
                Name = gift.Name,
                Price = gift.Price,
                Reserved = false,
                Deleted = false,
                Url = gift.Url,
                CategoryId = gift.CategoryId,
                GiftedUserId = gift.GiftedUserId
            });
            await _context.SaveChangesAsync();

            return gift;
        }

        public async Task<bool> Delete(int id)
        {
            var gift = _context.Gifts.Single(n => n.Id == id);
            gift.Deleted = true;
            _context.Update(gift);
            await _context.SaveChangesAsync();
            return await Task.FromResult(true);
        }

        public async Task<GiftEdit> Edit(GiftEdit gift)
        {
            var currentGift = await _context.Gifts.SingleAsync(n => n.Id == gift.Id);

            currentGift.Name = gift.Name;
            currentGift.Price = gift.Price;
            currentGift.Reserved = gift.Reserved;
            currentGift.Url = gift.Url;
            currentGift.CategoryId = gift.CategoryId;
            currentGift.Deleted = false;
            currentGift.GiftedUserId = gift.GiftedUserId;

            _context.Update(currentGift);
            await _context.SaveChangesAsync();

            // what for tbh? 
            return gift;
        }

        public async Task<List<GiftList>> Get()
        {
            var result = new List<GiftList>();
            var giftsDb = await _context.Gifts.ToListAsync();
            giftsDb.ForEach(n => result.Add(new GiftList(n.Id, n.Name, n.Price, n.Url, n.Reserved, n.Deleted, n.CategoryId, n.GiftedUserId)));
            return result;
        }

        public async Task<GiftList> GetById(int id)
        {
            var giftDb = await _context.Gifts.SingleAsync(n => n.Id == id);

            return new GiftList(giftDb.Id, giftDb.Name, giftDb.Price, giftDb.Url, giftDb.Reserved, giftDb.Deleted, giftDb.CategoryId, giftDb.GiftedUserId);
        }

        public async Task<List<GiftList>> GetGiftsByUserId(int id)
        {
            var giftsDb = await _context.Gifts
                .Where(n => n.GiftedUserId == id)
                .ToListAsync();

            List<GiftList> result = new();
            giftsDb.ForEach(gift =>
            {
                result.Add(new(gift.Id, gift.Name, gift.Price, gift.Url, gift.Reserved, gift.Deleted, gift.CategoryId, gift.GiftedUserId));
            });

            return result;
        }
    }
}

