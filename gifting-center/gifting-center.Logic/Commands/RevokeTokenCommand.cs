using gifting_center.Data.Repositories.Interfaces;
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

public class RevokeTokenCommandHandler(IRefreshTokenRepository refreshTokenRepository, IDateTimeProvider dateTimeProvider) : IRequestHandler<RevokeTokenCommand, string>
{
    public async Task<string> Handle(RevokeTokenCommand request, CancellationToken cancellationToken)
    {
        
        if (string.IsNullOrWhiteSpace(request.RefreshToken))
        {
            return string.Empty;
        }
        
        var refreshToken = await refreshTokenRepository.GetByRefreshToken(request.RefreshToken);

        if (refreshToken is null || refreshToken.Revoked is not null)
        {
            return string.Empty;
        }
        
        refreshToken.Revoke(dateTimeProvider.UtcNow);
        await refreshTokenRepository.SaveChanges();

        return refreshToken.Token;
    }
}