namespace gifting_center.Domain.ViewModels
{
    public class GiftedUserAdd
    {
        public string Name { get; set; }

        public GiftedUserAdd(string name)
        {
            Name = name;
        }
    }
}
