
using CdbInvestment.API.Models;
using CdbInvestment.Domain.Services;
using Microsoft.AspNetCore.Mvc;
namespace CdbInvestment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CdbInvestimentApiController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
{
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<CdbInvestimentApiController> _logger;

        private readonly ICdbInvestmentService _cdbInvestmentService;

        public CdbInvestimentApiController(ILogger<CdbInvestimentApiController> logger, ICdbInvestmentService cdbInvestmentService)
        {
            _logger = logger;
            _cdbInvestmentService = cdbInvestmentService;
        }

        [HttpPost]
        [Route("process-investment")]
        public async Task<IActionResult> ProcessInvestment([FromBody] ProcessCdbInvestimentRequest request)
        {
            _logger.LogInformation("Processing CDB investment...");
            await _cdbInvestmentService.ProcessInvestment(request.InvestedAmount, request.TermInMonths);
            return Ok("CDB investment processed successfully.");
        }
    }
}