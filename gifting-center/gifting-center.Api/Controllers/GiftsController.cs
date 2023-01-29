using Microsoft.AspNetCore.Mvc;
using gifting_center.Data.ViewModels;
using gifting_center.Logic.Services.Interfaces;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftsController : ControllerBase
    {
        private readonly IGiftsService _giftsService;

        public GiftsController(IGiftsService giftsService)
        {
            _giftsService = giftsService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gift>> GetById(int id)
        {
            return Ok(await _giftsService.GetById(id));
        }

        //[HttpGet]
        //public ActionResult GetAll()
        //{
        //    return null;
        //}

        [HttpGet("/user/{userId}")]
        public async Task<ActionResult<List<Gift>>> GetGiftsForUser(int userId)
        {
            return Ok(await _giftsService.GetByUserId(userId));
        }

        [HttpPost]
        public async Task<ActionResult<Gift>> AddGift(Gift gift)
        {
            return Ok(await _giftsService.Add(gift));
        }

        [HttpPut]
        public async Task<ActionResult<Gift>> Edit(Gift gift)
        {
            return Ok(await _giftsService.Edit(gift));
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return Ok(await _giftsService.Delete(id));
        }
    }
}
