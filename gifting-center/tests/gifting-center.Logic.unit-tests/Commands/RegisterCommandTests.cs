using gifting_center.Domain.Auth;
using gifting_center.Domain.Commands;
using gifting_center.Domain.Entities;
using gifting_center.Domain.Repositories;

namespace gifting_center.Logic.unit_tests.Commands;

public class RegisterCommandTests
{
    private readonly IUserRepository _userRepository;
    private readonly ICryptoProvider _cryptoProvider;

    private readonly RegisterCommandHandler _sut;

    public RegisterCommandTests()
    {
        _userRepository = Substitute.For<IUserRepository>();
        _cryptoProvider = Substitute.For<ICryptoProvider>();

        _sut = new RegisterCommandHandler(_userRepository, _cryptoProvider);
    }

    [Fact]
    public async void should_add_user_with_hashed_password_to_db()
    {
        const string password = "testPassword";
        const string passwordHashed = "tstpwdhsh";
        const string username = "test username";
        const string email = "test@email.com";

        _cryptoProvider.HashPassword(password).Returns(passwordHashed);

        await _sut.Handle(new RegisterCommand(username, password, email), CancellationToken.None);

        _userRepository.Received(1).Add(Arg.Is<UserEntity>(n =>
                n.Username == username && n.Email == email && n.PasswordHash == passwordHashed));
        await _userRepository.Received(1).SaveChanges();
    }
}