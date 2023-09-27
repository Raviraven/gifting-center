using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace gifting_center.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await _authService.Login(request);
            return string.IsNullOrWhiteSpace(result) ? BadRequest() : Ok(result);
        }
        //
        // // not needed? mostly action on FE 
        // public IActionResult Logout()
        // {
        //     return Ok();
        // }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            await this._authService.Register(request);
            return Ok();
        }
        
        // public IActionResult RefreshToken()
        // {
        //     return Ok();
        // }
        //
        // public IActionResult RevokeToken()
        // {
        //     return Ok();
        // }
    }
}
