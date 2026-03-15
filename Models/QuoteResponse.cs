namespace BiBerkQuoteAPI.Models;
public class QuoteResponse
{
    public decimal AnnualPremium { get; set; }
    public Dictionary<string, decimal> Breakdown { get; set; } = new();
}
