using CdbInvestment.Domain.ValueObjects;
using CdbInvestment.Domain.Dtos;

namespace CdbInvestment.Domain.Services
{
    public class CdbInvestmentService : ICdbInvestmentService
    {
        private const decimal MonthlyCdi = 0.009m;
        private const decimal BankRate = 1.08m;
        private const decimal MonthlyCompoundedRate = MonthlyCdi * BankRate;

        public async Task<ProcessCdbInvestimentResponse> ProcessInvestment(ProcessCdbInvestimentRequest request)
        {
            ProcessCdbInvestimentResponse response = new ProcessCdbInvestimentResponse();
            try
            {
                InvestmentTerm term = new InvestmentTerm(request.TermInMonths);
                Money investedAmount = new Money(request.InvestedAmount);

                decimal grossIncome = CalculateGrossIncome(investedAmount, term);
                decimal netIncome = CalculateNetIncome(investedAmount, grossIncome, term);

                response.GrossIncome = grossIncome;
                response.NetIncome = netIncome;
                response.Success = true;
            }
            catch (System.Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

        private decimal CalculateGrossIncome(Money investedAmount, InvestmentTerm term)
        {
            decimal finalGrossValue = investedAmount;
            for (int i = 0; i < term; i++)
            {
                finalGrossValue *= (1m + MonthlyCompoundedRate);
            }

            return Math.Round(finalGrossValue, 2, MidpointRounding.AwayFromZero);
        }

        private decimal CalculateNetIncome(Money investedAmount, decimal grossIncome, InvestmentTerm term)
        {
            decimal profit = grossIncome - investedAmount;
            decimal tax = profit * GetTaxRate(term);
            decimal netIncome = grossIncome - tax;
            return Math.Round(netIncome, 2, MidpointRounding.AwayFromZero);
        }

        private static decimal GetTaxRate(InvestmentTerm term)
        {
            if (term.Value <= 6)
            {
                return 0.225m;
            }

            if (term.Value <= 12)
            {
                return 0.20m;
            }

            if (term.Value <= 24)
            {
                return 0.175m;
            }

            return 0.15m;
        }
    }
}