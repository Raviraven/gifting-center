using gifting_center.Domain.Entities;

namespace gifting_center.Domain.ViewModels.Auth;

public class User
{
    public Guid Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public IEnumerable<string> Roles { get; set; } = null!;

    public static User Create(UserEntity userEntity)
    {
        return new User()
        {
            Email = userEntity.Email,
            Username = userEntity.Username,
            Id = userEntity.Id,
            Roles = userEntity.Roles.Count > 0 ? userEntity.Roles.Select(n => n.Name).ToList() : Enumerable.Empty<string>()
        };
    }
}