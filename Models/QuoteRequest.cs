namespace BiBerkQuoteAPI.Models;
public class QuoteRequest
{
    public string Industry { get; set; } = string.Empty;
    public decimal Payroll { get; set; }
    public string State { get; set; } = string.Empty;
    public decimal ExperienceMod { get; set; } = 1.0m; // Default 1.0
}
