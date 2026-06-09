using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CdbInvestment.Domain.ValueObjects
{
    public class Money : IEquatable<Money>
    {

        public decimal Value { get; }

        public Money(decimal value)
        {
            if (value <= 0)
            {
                throw new ArgumentException("O valor monetário investido deve ser positivo.");
            }
            Value = value;
        }


        public bool Equals(Money? other)
        {
            if (other is null)
            {
                return false;
            }

            return Value == other.Value;
        }

        public override bool Equals(object? obj)
        {
            return obj is Money other && Equals(other);
        }

        public override int GetHashCode() => Value.GetHashCode();


        public static implicit operator decimal(Money money) => money.Value;
        public static implicit operator Money(decimal value) => new Money(value);
    }
}
