using gifting_center.Data.Database.Models;

namespace gifting_center.Data.ViewModels.Auth;

public class User
{
    public Guid Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public IEnumerable<string> Roles { get; set; } = null!;

    public static User Create(UserDb userDb)
    {
        return new User()
        {
            Email = userDb.Email,
            Username = userDb.Username,
            Id = userDb.Id,
            Roles = userDb.Roles.Count > 0 ? userDb.Roles.Select(n => n.UserRole.ToString()).ToList() : Enumerable.Empty<string>()
        };
    }
}