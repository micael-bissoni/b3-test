using CdbInvestment.Domain.ValueObjects;
namespace CdbInvestment.Domain.Services
{
    public interface ICdbInvestmentService
    {
        Task ProcessInvestment(Money investedAmount, InvestmentTerm termInMonths);
    }
}