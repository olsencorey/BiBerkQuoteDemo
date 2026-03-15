using BiBerkQuoteAPI.Models;

namespace BiBerkQuoteAPI.Services;

public class QuoteService : IQuoteService
{
    // If you need dependencies (e.g., logger, db), inject them here.
    public QuoteService()
    {
    }

    public async Task<QuoteResponse> CalculateWorkersCompAsync(QuoteRequest req)
    {
        // Simple illustrative workers comp formula
        var classRate = req.Industry switch
        {
            "office" => 0.15m,
            "construction" => 12.0m,
            "retail" => 1.20m,
            _ => 2.0m
        };

        var stateMod = req.State switch
        {
            "PA" => 1.05m,
            "CA" => 1.20m,
            _ => 1.0m
        };

        var basePremium = (req.Payroll / 100) * classRate;
        var premium = basePremium * stateMod * req.ExperienceMod;

        return new QuoteResponse
        {
            AnnualPremium = decimal.Round(premium, 2),
            Breakdown = new Dictionary<string, decimal>
            {
                ["Base"] = decimal.Round(basePremium, 2),
                ["StateAdjustment"] = decimal.Round(basePremium * (stateMod - 1), 2),
                ["ExperienceMod"] = req.ExperienceMod
            }
        };
    }

    public async Task<BopQuoteResponse> CalculateBopAsync(BopQuoteRequest req)
    {
        var propertyBaseRate = req.Industry switch
        {
            "office" => 0.0015m,
            "retail" => 0.0020m,
            "contractor" => 0.0025m,
            _ => 0.0020m
        };

        var liabilityRate = req.Industry switch
        {
            "office" => 0.004m,
            "retail" => 0.006m,
            "contractor" => 0.0075m,
            _ => 0.005m
        };

        var locationMod = req.LocationRisk.ToLowerInvariant() switch
        {
            "low" => 0.9m,
            "high" => 1.2m,
            _ => 1.0m
        };

        var propertyBase = (req.BuildingValue + req.ContentsValue) * propertyBaseRate;
        var liabilityBase = req.AnnualRevenue * liabilityRate;
        var businessIncome = req.AnnualRevenue * 0.001m;

        var subtotal = propertyBase + liabilityBase + businessIncome;
        var premium = subtotal * locationMod;

        return new BopQuoteResponse
        {
            AnnualPremium = decimal.Round(premium, 2),
            Breakdown = new Dictionary<string, decimal>
            {
                ["Property"] = decimal.Round(propertyBase, 2),
                ["Liability"] = decimal.Round(liabilityBase, 2),
                ["BusinessIncome"] = decimal.Round(businessIncome, 2),
                ["LocationModifier"] = locationMod
            }
        };
    }
}
