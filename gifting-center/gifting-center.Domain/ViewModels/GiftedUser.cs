namespace gifting_center.Domain.ViewModels
{
	public class GiftedUser
	{
        public GiftedUser(int id, string name, List<Gift>? gifts = null)
        {
            Id = id;
            Name = name;
            Gifts = gifts;
        }

        public int Id { get; set; }

        public string Name { get; set; }


        public List<Gift>? Gifts { get; set; }
    }
}

