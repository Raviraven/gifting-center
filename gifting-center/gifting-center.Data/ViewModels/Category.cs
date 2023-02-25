using System;
using gifting_center.Data.Database.Models;

namespace gifting_center.Data.ViewModels
{
	public class Category
	{
        public Category(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public int Id { get; set; }

        public string Name { get; set; }
    }
}

