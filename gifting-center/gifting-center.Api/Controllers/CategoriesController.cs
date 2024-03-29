﻿using gifting_center.Data.ViewModels;
using gifting_center.Logic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class CategoriesController : Controller
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

        [HttpGet("{id}")]
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

