using FamousQuotesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FamousQuotesAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Quote> Quotes { get; set; }
        public DbSet<SavedQuote> SavedQuotes { get; set; }
    }
}
