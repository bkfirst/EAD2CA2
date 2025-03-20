using System.ComponentModel.DataAnnotations;

namespace FamousQuotesAPI.Models
{
    public class Quote
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Author { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime DateAdded { get; set; } = DateTime.UtcNow;
    }
}
