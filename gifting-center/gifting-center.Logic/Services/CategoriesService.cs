using System;
using gifting_center.Data.Extensions;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels;
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

        public async Task<Category> Add(Category category)
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
            return await _categoriesRepository.GetAll();
        }

        public async Task<Category> GetById(string id)
        {
            return await _categoriesRepository.GetById(id.ParseId());
        }
    }
}

