using gifting_center.Logic.Repositories;
using MediatR;

namespace gifting_center.Logic.Commands;

public class RevokeTokenCommand : IRequest<string>
{
    public RevokeTokenCommand(string refreshToken)
    {
        RefreshToken = refreshToken;
    }

    public string RefreshToken { get; } 
}

public class RevokeTokenCommandHandler: IRequestHandler<RevokeTokenCommand, string>
{
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IDateTimeProvider _dateTimeProvider;

    public RevokeTokenCommandHandler(IRefreshTokenRepository refreshTokenRepository, IDateTimeProvider dateTimeProvider)
    {
        _refreshTokenRepository = refreshTokenRepository;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<string> Handle(RevokeTokenCommand request, CancellationToken cancellationToken)
    {
        
        if (string.IsNullOrWhiteSpace(request.RefreshToken))
        {
            return string.Empty;
        }
        
        var refreshToken = await _refreshTokenRepository.GetByRefreshToken(request.RefreshToken);

        if (refreshToken is null || refreshToken.Revoked is not null)
        {
            return string.Empty;
        }
        
        refreshToken.Revoke(_dateTimeProvider.UtcNow);
        await _refreshTokenRepository.SaveChanges();

        return refreshToken.Token;
    }
}