using System;
using System.ComponentModel.DataAnnotations;

namespace gifting_center.Data.Database.Models
{
    public class UserDb
    {
        [Key]
        public Guid Guid { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }



        public ICollection<UserRoleDb> Roles { get; set; }

        // user can also be the one we want to store gifts for
        public GiftedUserDb GiftedUser { get; set; }

        public UserDb()
        {
        }
    }
}

