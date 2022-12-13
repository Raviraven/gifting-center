using System;
using System.ComponentModel.DataAnnotations;
using gifting_center.Data.Enums;

namespace gifting_center.Data.Database.Models
{
    public class UserRoleDb
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public UserRoles UserRole { get; set; }

        public UserRoleDb()
        {
        }
    }
}

