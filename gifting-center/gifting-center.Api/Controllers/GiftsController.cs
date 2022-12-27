using Microsoft.AspNetCore.Mvc;
using gifting_center.Data.ViewModels;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<Gift>> GetGiftsForUser()
        {
            return null;
        }
    }
}
