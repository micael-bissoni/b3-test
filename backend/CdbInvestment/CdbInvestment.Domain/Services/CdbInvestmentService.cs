using CdbInvestment.Domain.ValueObjects;

namespace CdbInvestment.Domain.Services
{
    public class CdbInvestmentService : ICdbInvestmentService
    {
        public async Task ProcessInvestment(Money investedAmount, InvestmentTerm termInMonths)
        {
            //@TODO: Implement the logic to process the CDB investment, such as saving it to a database or performing calculations.
            await Task.CompletedTask;
        }
    }
}