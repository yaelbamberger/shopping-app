using Microsoft.EntityFrameworkCore;
using CategoriesApi.Models;

namespace CategoriesApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // כאן מוסיפים את הנתונים
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "חלב ומוצריו" },
                new Category { Id = 2, Name = "טואלטיקה" },
                new Category { Id = 3, Name = "בשר" },
                new Category { Id = 4, Name = "ירקות ופירות" }
            );
        }
    }
}
