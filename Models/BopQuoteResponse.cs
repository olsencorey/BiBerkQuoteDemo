namespace BiBerkQuoteAPI.Models;

public class BopQuoteResponse
{
    public decimal AnnualPremium { get; set; }
    public Dictionary<string, decimal> Breakdown { get; set; } = new();
}
