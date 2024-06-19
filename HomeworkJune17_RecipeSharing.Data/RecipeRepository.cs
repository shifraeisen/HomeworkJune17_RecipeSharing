using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeworkJune17_RecipeSharing.Data
{
    public class RecipeRepository
    {
        private readonly string _connectionString;

        public RecipeRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Recipe> GetTop3RecentRecipes()
        {
            var context = new RecipesDataContext(_connectionString);
            return context.Recipes.Include(r => r.Category)
                .OrderByDescending(r => r.DateCreated)
                .Where(r => r.IsPublic == true)
                .Take(3)
                .ToList();
        }
        public List<Category> GetCategories()
        {
            var context = new RecipesDataContext(_connectionString);
            return context.Categories.ToList();
        }
        public void AddRecipe(Recipe r)
        {
            var context = new RecipesDataContext(_connectionString);
            context.Recipes.Add(r);
            context.SaveChanges();
        }
        public List<CategoriesAmounts> GetCategoriesAndAmount()
        {
            var context = new RecipesDataContext(_connectionString);
            return context.CategoriesAmounts.FromSql(@$"select c.*, RecipeCount
                     from Categories c
                     cross apply (select count(*) as RecipeCount from Recipes r where r.CategoryId = c.Id)a").ToList();
        }
        public void AddCategory(Category c)
        {
            var context = new RecipesDataContext(_connectionString);
            context.Categories.Add(c);
            context.SaveChanges();
        }
    }
}
