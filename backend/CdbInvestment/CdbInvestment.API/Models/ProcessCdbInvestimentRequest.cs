using CdbInvestment.Domain.ValueObjects;

namespace CdbInvestment.API.Models
{
    public class ProcessCdbInvestimentRequest
    {
        public Money InvestedAmount { get; set; }
        public InvestmentTerm TermInMonths { get; set; }
    }
}