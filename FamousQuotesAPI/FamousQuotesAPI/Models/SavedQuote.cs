using System.ComponentModel.DataAnnotations;

namespace FamousQuotesAPI.Models
{
    public class SavedQuote
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int QuoteId { get; set; }

        public DateTime DateSaved { get; set; } = DateTime.UtcNow;
    }
}
