using gifting_center.Data.Database;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace gifting_center.Data.Repositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        protected readonly PostgresSqlContext _context;

        public CategoriesRepository(PostgresSqlContext context)
        {
            _context = context;
        }

        public async Task<CategoryAdd> Add(CategoryAdd category)
        {
            await _context.GiftCategories.AddAsync(new()
            {
                Name = category.Name
            });
            await _context.SaveChangesAsync();
            return category;
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Category> Edit(Category category)
        {
            var categoryDb = await _context.GiftCategories.SingleAsync(cat => cat.Id == category.Id);
            categoryDb.Name = category.Name;
            //categoryDb.Gifts =

            _context.Update(categoryDb);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<List<Category>> GetAll()
        {
            var categories = await _context.GiftCategories.ToListAsync();
            List<Category> result = new();

            categories.ForEach(cat => result.Add(new(cat.Id, cat.Name)));
            return result;
        }

        public async Task<Category> GetById(int id)
        {
            var categoryDb = await _context.GiftCategories.SingleAsync(n => n.Id == id);

            return new(categoryDb.Id, categoryDb.Name);
        }
    }
}

