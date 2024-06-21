namespace HomeworkJune17_RecipeSharing.Web.Models
{
    public class RecipePdfModel
    {
        public string Title { get; set; }
        public string ImageName { get; set; }
        public List<string> Ingredients { get; set; }
        public List<string> Steps { get; set; }
        public string Category { get; set; }
    }
}
