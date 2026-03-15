using Microsoft.AspNetCore.Mvc;
using BiBerkQuoteAPI.Models;
using BiBerkQuoteAPI.Services;

namespace BiBerkQuoteAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly IQuoteService _service;
    public QuotesController(IQuoteService service) => _service = service;
    [HttpPost("workerscomp")]
    public async Task<ActionResult<QuoteResponse>> WorkersComp(QuoteRequest req)
    {
        var resp = await _service.CalculateWorkersCompAsync(req);
        return Ok(resp);
    }
    [HttpPost("bop")]
    public async Task<ActionResult<BopQuoteResponse>> Bop([FromBody] BopQuoteRequest request)
    {
        var response = await _service.CalculateBopAsync(request);
        return Ok(response);
    }
}
