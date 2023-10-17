using gifting_center.Domain.Exceptions;
using gifting_center.Domain.Repositories;
using gifting_center.Domain.Services.Interfaces;
using gifting_center.Domain.ViewModels;

namespace gifting_center.Domain.Services
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

