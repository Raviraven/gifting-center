using gifting_center.Logic.ViewModels;

namespace gifting_center.Domain.ViewModels
{
    public class Gift
    {
        public Gift(
            int id,
            string name,
            float price,
            string url,
            bool reserved,
            bool deleted,
            int categoryId,
            int giftedUserId,
            Category? category = null,
            GiftedUser? giftedUser = null)
        {
            Id = id;
            Name = name;
            Price = price;
            Url = url;
            Reserved = reserved;
            Deleted = deleted;
            CategoryId = categoryId;
            GiftedUserId = giftedUserId;
            Category = category;
            GiftedUser = giftedUser;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public string Url { get; set; }

        public bool Reserved { get; set; }

        public bool Deleted { get; set; }

        public int CategoryId { get; set; }

        public int GiftedUserId { get; set; }


        public Category Category { get; set; }

        public GiftedUser GiftedUser { get; set; }
    }
}

