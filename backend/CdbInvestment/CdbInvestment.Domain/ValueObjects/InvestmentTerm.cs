using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CdbInvestment.Domain.ValueObjects
{
    public class InvestmentTerm : IEquatable<InvestmentTerm>
    {
        public int Value { get; }

        public InvestmentTerm(int value)
        {

            if (value <= 1)
            {
                throw new ArgumentException("O prazo em meses para resgate deve ser maior que 1.");
            }

            Value = value;
        }

        public bool Equals(InvestmentTerm? other)
        {
            if (other is null) return false;
            return Value == other.Value;
        }

        public override bool Equals(object? obj) => Equals(obj as InvestmentTerm);

        public override int GetHashCode() => Value.GetHashCode();

        public static implicit operator int(InvestmentTerm term) => term.Value;
        public static implicit operator InvestmentTerm(int value) => new InvestmentTerm(value);
    }
}