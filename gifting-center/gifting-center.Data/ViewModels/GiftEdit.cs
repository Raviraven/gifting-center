namespace gifting_center.Data.ViewModels
{
    public class GiftEdit : GiftAdd
    {
        public GiftEdit(string name, float price, string url, bool reserved, bool deleted, int categoryId,
            int giftedUserId, int id) : base(name, price, url, reserved, deleted, categoryId, giftedUserId)
        {
            Id = id;
        }

        public int Id { get; set; }

    }
}
