using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace gifting_center.Data.Database.Models
{
    public class UserEntity
    {
        [Key] public Guid Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        // used for activate account and reset password
        // public string ResetPasswordToken { get; set; }
        //
        // public DateTime ResetPasswordTokenExpires { get; set; }
        //
        // public bool IsResetPasswordTokenActive { get; set; }


        public ICollection<UserRoleEntity> Roles { get; set; }

        // user can also be the one we want to store gifts for
        public GiftedUserEntity? GiftedUser { get; set; }

        public RefreshTokenEntity? RefreshToken { get; set; }

        public UserEntity()
        {
        }

        public static UserEntity Create(string username, string email, string passwordHash, List<string> roles)
        {
            return new UserEntity
            {
                Email = email,
                Username = username,
                PasswordHash = passwordHash,
                Roles = roles.Select(UserRoleEntity.Create).ToList()
            };
        }
    }
}