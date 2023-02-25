using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace gifting_center.Data.ViewModels
{
    public class GiftAdd
    {
        public GiftAdd(string name, float price, string url, bool reserved, bool deleted, int categoryId,
            int giftedUserId)
        {
            Name = name;
            Price = price;
            Url = url;
            Reserved = reserved;
            Deleted = deleted;
            CategoryId = categoryId;
            GiftedUserId = giftedUserId;
        }

        public string Name { get; set; }

        public float Price { get; set; }

        public string Url { get; set; }

        public bool Reserved { get; set; }

        public bool Deleted { get; set; }

        public int CategoryId { get; set; }

        public int GiftedUserId { get; set; }
    }
}
