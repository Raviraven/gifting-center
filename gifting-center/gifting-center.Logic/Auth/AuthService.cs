using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Data.ViewModels.Auth;
using gifting_center.Logic.Auth.Interfaces;

namespace gifting_center.Logic.Auth;

public class AuthService(IUserRepository userRepository, IJwtProvider jwtProvider, ICryptoProvider cryptoProvider) : IAuthService
{
    
    public async Task<string> Login(LoginRequest request)
    {
        var user = await userRepository.GetByEmail(request.Email);
        if (user is not null && cryptoProvider.VerifyPassword(request.Password, user.PasswordHash))
        {
            // return JWT
            return jwtProvider.Generate(User.Create(user));
            
            // generate refresh token
        }
        
        return string.Empty;
    }

    public async Task Register(RegisterRequest request)
    {
        // some validations

        var passwordHash = cryptoProvider.HashPassword(request.Password);
        var user = UserDb.Create(request.Username, request.Email, passwordHash);
        await userRepository.Add(user);

        // generate token 
        // send confirmation email
    }
}