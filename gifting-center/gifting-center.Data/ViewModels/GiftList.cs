namespace gifting_center.Data.ViewModels
{
    public class GiftList
    {
        public GiftList(int id, string name, float price, string url, bool reserved, bool deleted, int categoryId,
            int giftedUserId)
        {
            Id = id;
            Name = name;
            Price = price;
            Url = url;
            Reserved = reserved;
            Deleted = deleted;
            CategoryId = categoryId;
            GiftedUserId = giftedUserId;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public string Url { get; set; }

        public bool Reserved { get; set; }

        public bool Deleted { get; set; }

        public int CategoryId { get; set; }

        public int GiftedUserId { get; set; }
    }
}
