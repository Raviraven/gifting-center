using gifting_center.Data.Repositories.Interfaces;
using gifting_center.Logic.Auth;
using gifting_center.Logic.Entities;
using gifting_center.Logic.Identity;
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
public class RegisterCommandHandler : IRequestHandler<RegisterCommand>
{
    private readonly IUserRepository _userRepository;
    private readonly ICryptoProvider _cryptoProvider;


    public RegisterCommandHandler(IUserRepository userRepository, ICryptoProvider cryptoProvider)
    {
        _userRepository = userRepository;
        _cryptoProvider = cryptoProvider;
    }

    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var passwordHash = _cryptoProvider.HashPassword(request.Password);
        var user = UserEntity.Create(request.Username, request.Email, passwordHash, new List<string>{ Permissions.UserRole.User });
        _userRepository.Add(user);
        await _userRepository.SaveChanges();
    }
}