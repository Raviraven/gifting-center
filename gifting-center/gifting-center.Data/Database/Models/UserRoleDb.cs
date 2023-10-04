using System.ComponentModel.DataAnnotations;

namespace gifting_center.Data.Database.Models
{
    public class UserRoleDb
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public UserRoleDb()
        {
        }

        public static UserRoleDb Create(string name)
        {
            return new UserRoleDb()
            {
                Name = name
            };
        }
    }
}

