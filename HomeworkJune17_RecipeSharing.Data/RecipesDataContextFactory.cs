using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeworkJune17_RecipeSharing.Data;

public class RecipesDataContextFactory : IDesignTimeDbContextFactory<RecipesDataContext>
{
    public RecipesDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}HomeworkJune17_RecipeSharing.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new RecipesDataContext(config.GetConnectionString("ConStr"));
    }
}