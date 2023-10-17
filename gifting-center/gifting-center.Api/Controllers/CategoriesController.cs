using gifting_center.Logic.Identity;
using gifting_center.Logic.Services.Interfaces;
using gifting_center.Logic.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [Authorize(Roles = nameof(Permissions.UserRole.Admin))]
    //[RoleGate(nameof(UserRoles.Admin))]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService _categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            return Ok(await _categoriesService.Get());
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<Category>> Get(int id)
        {
            return Ok(await _categoriesService.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<CategoryAdd>> Add([FromBody] CategoryAdd category)
        {
            return Ok(await _categoriesService.Add(category));
        }

        [HttpPut]
        public async Task<ActionResult<Category>> Put([FromBody] Category category)
        {
            return Ok(await _categoriesService.Edit(category));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return Ok(await _categoriesService.Delete(id));
        }
    }
}

