namespace gifting_center.Data.ViewModels.Auth;

public class LoginResponse
{
    public string AccessToken { get; set; }
    
    public string RefreshToken { get; set; }

    private LoginResponse(string accessToken, string refreshToken)
    {
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
    }

    public static LoginResponse Create(string accessToken, string refreshToken)
        => new LoginResponse(accessToken, refreshToken);
}