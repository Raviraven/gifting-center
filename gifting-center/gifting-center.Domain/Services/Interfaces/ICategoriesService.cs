using gifting_center.Domain.ViewModels;

namespace gifting_center.Domain.Services.Interfaces
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

