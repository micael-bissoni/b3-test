using System;
using CdbInvestment.Domain.ValueObjects;

namespace CdbInvestment.Domain.Entities
{
    public class CdbEntity
    {
        public Money InvestedAmount { get; private set; }
        public InvestmentTerm TermInMonths { get; private set; }

        private const decimal CdiRate = 0.009m;
        private const decimal TbRate = 1.08m;

        public CdbEntity(Money investedAmount, InvestmentTerm termInMonths)
        {
            InvestedAmount = investedAmount;
            TermInMonths = termInMonths;
        }

        public decimal CalculateGrossAmount()
        {
            decimal currentAmount = InvestedAmount;

            for (int i = 0; i < TermInMonths; i++)
            {
                currentAmount *= (1 + CdiRate * TbRate);
            }

            return Math.Round(currentAmount, 2);
        }

        public decimal CalculateTaxAmount()
        {
            decimal grossAmount = CalculateGrossAmount();
            decimal profit = grossAmount - InvestedAmount;
            decimal taxRate = GetTaxRate();

            return Math.Round(profit * taxRate, 2);
        }

        public decimal CalculateNetAmount()
        {
            return CalculateGrossAmount() - CalculateTaxAmount();
        }

        private decimal GetTaxRate()
        {
            if (TermInMonths <= 6) return 0.225m;
            if (TermInMonths <= 12) return 0.20m;
            if (TermInMonths <= 24) return 0.175m;

            return 0.15m;
        }
    }
}