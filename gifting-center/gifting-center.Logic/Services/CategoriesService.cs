using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
using gifting_center.Logic.Exceptions;
using gifting_center.Logic.Services.Interfaces;

namespace gifting_center.Logic.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly ICategoriesRepository _categoriesRepository;

        public CategoriesService(ICategoriesRepository categoriesRepository)
        {
            this._categoriesRepository = categoriesRepository;
        }

        public async Task<CategoryAdd> Add(CategoryAdd category)
        {
            return await _categoriesRepository.Add(category);
        }

        public async Task<bool> Delete(int id)
        {
            return await _categoriesRepository.Delete(id);
        }

        public async Task<Category> Edit(Category category)
        {
            return await _categoriesRepository.Edit(category);
        }

        public async Task<List<Category>> Get()
        {
            var result = await _categoriesRepository.GetAll();

            if (result == null || result.Count == 0)
            {
                throw new NoCategoryException("No categories found");
            }

            return result;
        }

        public async Task<Category> GetById(int id)
        {
            try
            {
                return await _categoriesRepository.GetById(id);
            }
            catch (InvalidOperationException)
            {
                throw new NoCategoryException($"There is no category with id: {id}");
            }
        }
    }
}

