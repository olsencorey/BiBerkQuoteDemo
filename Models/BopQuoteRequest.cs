namespace BiBerkQuoteAPI.Models;

public class BopQuoteRequest
{
    public string Industry { get; set; } = string.Empty;     // office, retail, contractor, etc.
    public decimal AnnualRevenue { get; set; }               // e.g., 250000
    public decimal BuildingValue { get; set; }               // if they own the building
    public decimal ContentsValue { get; set; }               // equipment, inventory, etc.
    public string LocationRisk { get; set; } = "medium";     // low, medium, high
}
