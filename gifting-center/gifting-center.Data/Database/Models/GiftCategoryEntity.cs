using System;
using System.ComponentModel.DataAnnotations;

namespace gifting_center.Data.Database.Models
{
    public class GiftCategoryEntity
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }


        public ICollection<GiftEntity> Gifts { get; set; }

        public GiftCategoryEntity()
        {
        }
    }
}

