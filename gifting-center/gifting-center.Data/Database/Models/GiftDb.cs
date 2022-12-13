using System;
using System.ComponentModel.DataAnnotations;

namespace gifting_center.Data.Database.Models
{
    public class GiftDb
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public string Url { get; set; }

        public bool Reserved { get; set; }

        public bool Deleted { get; set; }



        public GiftCategoryDb Category { get; set; }

        public GiftedUserDb GiftedUser { get; set; }

        public GiftDb()
        {
        }
    }
}

