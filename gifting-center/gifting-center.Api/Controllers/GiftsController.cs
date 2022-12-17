using Microsoft.AspNetCore.Mvc;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftsController : ControllerBase
    {
        [HttpGet]
        public IActionResult<List<>> GetGiftsForUser()
        {
            return null;
        }
    }
}
