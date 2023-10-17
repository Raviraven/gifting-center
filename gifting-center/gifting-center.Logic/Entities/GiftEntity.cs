using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gifting_center.Logic.Entities
{
    public class GiftEntity
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public string Url { get; set; }

        public bool Reserved { get; set; }

        public bool Deleted { get; set; }


        public int CategoryId { get; set; }

        public int GiftedUserId { get; set; }

        [ForeignKey("CategoryId")]
        public GiftCategoryEntity Category { get; set; }

        [ForeignKey("GiftedUserId")]
        public GiftedUserEntity GiftedUser { get; set; }

        public GiftEntity()
        {
        }
    }
}

