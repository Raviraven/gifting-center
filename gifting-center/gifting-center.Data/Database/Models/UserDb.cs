using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace gifting_center.Data.Database.Models
{
    public class UserDb
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


        public ICollection<UserRoleDb> Roles { get; set; }

        // user can also be the one we want to store gifts for
        public GiftedUserDb? GiftedUser { get; set; }

        public RefreshTokenDb? RefreshToken { get; set; }

        public UserDb()
        {
        }

        public static UserDb Create(string username, string email, string passwordHash, List<string> roles)
        {
            return new UserDb
            {
                Email = email,
                Username = username,
                PasswordHash = passwordHash,
                Roles = roles.Select(UserRoleDb.Create).ToList()
            };
        }
    }
}