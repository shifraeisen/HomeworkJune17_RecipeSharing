using HomeworkJune17_RecipeSharing.Data;
using HomeworkJune17_RecipeSharing.Web.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace HomeworkJune17_RecipeSharing.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly string _connectionString;

        public RecipesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet("GetRecipes")]
        public List<Recipe> GetRecipes()
        {
            var repo = new RecipeRepository(_connectionString);
            return repo.GetRecipes();
        }
        [HttpGet("GetCategories")]
        public List<Category> GetCategories()
        {
            var repo = new RecipeRepository(_connectionString);
            return repo.GetCategories();
        }
        [HttpPost("AddRecipe")]
        public void AddRecipe(Recipe r)
        {
            var image = ConvertFromBase64(r.ImageName);
            var fileName = $"{Guid.NewGuid()}";
            r.ImageName = fileName;
            System.IO.File.WriteAllBytes($"uploads/{fileName}.jpg", image);

            r.DateCreated = DateTime.Now;

            var repo = new RecipeRepository(_connectionString);
            repo.AddRecipe(r);
        }
        [HttpGet("GetCategoriesAndAmounts")]
        public List<CategoriesAmounts> GetCategoriesAndAmounts()
        {
            var repo = new RecipeRepository(_connectionString);
            return repo.GetCategoriesAndAmount();
        }
        [HttpPost("AddCategory")]
        public void AddCategory(Category c)
        {
            var repo = new RecipeRepository(_connectionString);
            repo.AddCategory(c);
        }

        private byte[] ConvertFromBase64(string data)
        {
            int indexOfComma = data.IndexOf(',');
            string base64 = data.Substring(indexOfComma + 1);
            return Convert.FromBase64String(base64);
        }
    }
}
