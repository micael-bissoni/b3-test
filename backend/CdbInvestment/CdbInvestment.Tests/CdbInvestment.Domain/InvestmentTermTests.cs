using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using CdbInvestment.Domain.ValueObjects;

public class InvestmentTermTests
{
    [Fact]
    public void Constructor_WithValidValue_ShouldInitializeCorrectly()
    {

        var term = new InvestmentTerm(6);


        Assert.Equal(6, term.Value);
    }

    [Theory]
    [InlineData(1)]
    [InlineData(0)]
    [InlineData(-5)]
    public void Constructor_WithValueLessThanOrEqualToOne_ShouldThrowArgumentException(int invalidValue)
    {

        var exception = Assert.Throws<ArgumentException>(() => new InvestmentTerm(invalidValue));
        Assert.Equal("O prazo em meses para resgate deve ser maior que 1.", exception.Message);
    }

    [Fact]
    public void Equals_WithNullTerm_ShouldReturnFalse()
    {

        var term = new InvestmentTerm(12);


        bool result = term.Equals((InvestmentTerm?)null);


        Assert.False(result);
    }

    [Fact]
    public void Equals_WithSameValue_ShouldReturnTrue()
    {

        var term1 = new InvestmentTerm(24);
        var term2 = new InvestmentTerm(24);


        bool result = term1.Equals(term2);


        Assert.True(result);
    }

    [Fact]
    public void Equals_WithDifferentValue_ShouldReturnFalse()
    {

        var term1 = new InvestmentTerm(24);
        var term2 = new InvestmentTerm(36);


        bool result = term1.Equals(term2);


        Assert.False(result);
    }

    [Fact]
    public void ObjectEquals_WithNullObject_ShouldReturnFalse()
    {

        var term = new InvestmentTerm(12);


        bool result = term.Equals((object?)null);


        Assert.False(result);
    }

    [Fact]
    public void ObjectEquals_WithDifferentType_ShouldReturnFalse()
    {

        var term = new InvestmentTerm(12);
        var commonObject = new object();


        bool result = term.Equals(commonObject);


        Assert.False(result);
    }

    [Fact]
    public void ObjectEquals_WithValidInvestmentTermObject_ShouldEvaluateCorrectly()
    {

        var term1 = new InvestmentTerm(12);
        object term2 = new InvestmentTerm(12);


        bool result = term1.Equals(term2);


        Assert.True(result);
    }

    [Fact]
    public void GetHashCode_ShouldReturnSameHashCode_ForEqualValues()
    {

        var term1 = new InvestmentTerm(6);
        var term2 = new InvestmentTerm(6);


        Assert.Equal(term1.GetHashCode(), term2.GetHashCode());
    }

    [Fact]
    public void ImplicitOperator_FromInvestmentTermToInt_ShouldConvertCorrectly()
    {

        var term = new InvestmentTerm(18);


        int intValue = term; // Ativa a conversão implícita de InvestmentTerm para int


        Assert.Equal(18, intValue);
    }

    [Fact]
    public void ImplicitOperator_FromIntToInvestmentTerm_ShouldConvertCorrectly()
    {

        int rawValue = 18;


        InvestmentTerm term = rawValue; // Ativa a conversão implícita de int para InvestmentTerm


        Assert.NotNull(term);
        Assert.Equal(18, term.Value);
    }
}