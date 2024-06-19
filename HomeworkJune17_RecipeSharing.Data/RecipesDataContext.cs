using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace HomeworkJune17_RecipeSharing.Data;

public class RecipesDataContext : DbContext
{
    private readonly string _connectionString;

    public RecipesDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
        modelBuilder.Entity<CategoriesAmounts>().HasNoKey().ToView("view_that_doesn't_exist");
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Category> Categories { get; set; }

    public DbSet<CategoriesAmounts> CategoriesAmounts { get; set; }
}