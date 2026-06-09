using CdbInvestment.Domain.Dtos;
namespace CdbInvestment.Domain.Services
{
    public interface ICdbInvestmentService
    {
        Task<ProcessCdbInvestimentResponse> ProcessInvestment(ProcessCdbInvestimentRequest request);
    }
}