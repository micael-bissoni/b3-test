
using CdbInvestment.API.Dtos;
using CdbInvestment.Domain.Dtos;
using CdbInvestment.Domain.Services;
using Microsoft.AspNetCore.Mvc;
namespace CdbInvestment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CdbInvestimentApiController : ControllerBase
    {
        private readonly ILogger<CdbInvestimentApiController> _logger;

        private readonly ICdbInvestmentService _cdbInvestmentService;

        public CdbInvestimentApiController(ILogger<CdbInvestimentApiController> logger, ICdbInvestmentService cdbInvestmentService)
        {
            _logger = logger;
            _cdbInvestmentService = cdbInvestmentService;
        }

        [HttpPost]
        [Route("process-investment")]
        public async Task<IActionResult> ProcessInvestment([FromBody] RequestDto request)
        {
            _logger.LogInformation("Processing CDB investment...");
            try
            {
                var dto = new ProcessCdbInvestimentRequest
                {
                    InvestedAmount = request.InvestedIncome,
                    TermInMonths = request.TermInMonths
                };
                var response = await _cdbInvestmentService.ProcessInvestment(dto);
                return Ok(response);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "An error occurred while processing the CDB investment.");
                return BadRequest("An error occurred while processing the CDB investment.");
            }
        }
    }
}