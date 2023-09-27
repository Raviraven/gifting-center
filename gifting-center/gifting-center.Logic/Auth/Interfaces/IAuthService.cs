using gifting_center.Data.ViewModels.Auth;

namespace gifting_center.Logic.Auth.Interfaces;

public interface IAuthService
{
    Task<string> Login(LoginRequest request);
    
    Task Register(RegisterRequest request);
    
}