using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeworkJune17_RecipeSharing.Data
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public string Ingredients { get; set; }
        public string Steps { get; set; }
        public string ImageName { get; set; }
        public bool IsPublic { get; set; }
        public DateTime DateCreated { get; set; }


        public Category Category { get; set; }
    }
}
