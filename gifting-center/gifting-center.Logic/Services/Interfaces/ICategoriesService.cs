using gifting_center.Data.ViewModels;

namespace gifting_center.Logic.Services.Interfaces
{
    public interface ICategoriesService
    {
        Task<CategoryAdd> Add(CategoryAdd category);

        Task<bool> Delete(int id);

        Task<Category> Edit(Category category);

        Task<List<Category>> Get();

        Task<Category> GetById(int id);
    }
}

