using System;
using gifting_center.Data.ViewModels;

namespace gifting_center.Logic.Services.Interfaces
{
	public interface ICategoriesService
	{
		Task<Category> Add(Category category);

		Task<bool> Delete(int id);

		Task<Category> Edit(Category category);

		Task<List<Category>> Get();

		Task<Category> GetById(string id);
	}
}

