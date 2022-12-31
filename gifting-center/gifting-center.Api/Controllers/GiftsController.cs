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

        //[HttpGet("{giftId}")]
        //public ActionResult GetById()
        //{
        //    return null;
        //}

        //[HttpGet]
        //public ActionResult GetAll()
        //{
        //    return null;
        //}

        [HttpGet("/user/{userId}")]
        public async Task<ActionResult<List<Gift>>> GetGiftsForUser(string userId)
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
    }
}
