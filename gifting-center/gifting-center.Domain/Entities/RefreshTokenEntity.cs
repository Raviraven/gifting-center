using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace gifting_center.Domain.Entities;

//[Owned]
public class RefreshTokenEntity
{
    [Key]
    [JsonIgnore]
    public int Id { get; set; }
    public required string Token { get; set; }
    public DateTime Expires { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime? Revoked { get; set; }

    //public bool IsValid { get; set; }

    //public string CreatedByIp { get; set; }
    //public string RevokedByIp { get; set; }
    //public string ReplacedByToken { get; set; }
    //public string ReasonRevoked { get; set; }

    public static RefreshTokenEntity Create(string token, DateTime expires, DateTime created, DateTime? revoked = null)
        => new RefreshTokenEntity()
        {
            Token = token,
            Created = created,
            Expires = expires,
            Revoked = revoked
        };

    public void Revoke(DateTime revoked)
    {
        this.Revoked = revoked;
    }
}