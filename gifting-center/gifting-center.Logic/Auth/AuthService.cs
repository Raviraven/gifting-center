using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth.Interfaces;

namespace gifting_center.Logic.Auth;

public class AuthService(IUserRepository userRepository) : IAuthService
{
    public async Task Register(RegisterRequest request)
    {
        // some validations

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        var user = UserDb.Create(request.Username, request.Email, passwordHash);
        await userRepository.Add(user);

        // generate token 
        // send confirmation email
    }
}