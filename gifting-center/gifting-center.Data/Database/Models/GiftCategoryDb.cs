using System;
using System.ComponentModel.DataAnnotations;

namespace gifting_center.Data.Database.Models
{
    public class GiftCategoryDb
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }


        public ICollection<GiftDb> Gifts { get; set; }

        public GiftCategoryDb()
        {
        }
    }
}

