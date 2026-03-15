using BiBerkQuoteAPI.Models;

namespace BiBerkQuoteAPI.Services;

public interface IQuoteService
{
    Task<QuoteResponse> CalculateWorkersCompAsync(QuoteRequest req);
    Task<BopQuoteResponse> CalculateBopAsync(BopQuoteRequest req);
}
