using System.ComponentModel.DataAnnotations;

namespace gifting_center.Data.Database.Models
{
    public class UserRoleEntity
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public UserRoleEntity()
        {
        }

        public static UserRoleEntity Create(string name)
        {
            return new UserRoleEntity()
            {
                Name = name
            };
        }
    }
}

