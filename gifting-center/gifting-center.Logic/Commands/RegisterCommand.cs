using gifting_center.Data.Database.Models;
using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Logic.Auth;
using MediatR;

namespace gifting_center.Logic.Commands;

public class RegisterCommand : IRequest
{
    public string Username { get; }

    public string Password { get; }

    public string Email { get; }

    public RegisterCommand(string username, string password, string email)
    {
        Username = username;
        Password = password;
        Email = email;
    }
}

//TODO: add some kind of a logger?
public class RegisterCommandHandler
    (IUserRepository userRepository, ICryptoProvider cryptoProvider) : IRequestHandler<RegisterCommand>
{
    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var passwordHash = cryptoProvider.HashPassword(request.Password);
        var user = UserDb.Create(request.Username, request.Email, passwordHash);
        await userRepository.Add(user);
    }
}