using Xunit;
using CdbInvestment.Domain.ValueObjects;

public class MoneyTests
{
    [Fact]
    public void Constructor_WithPositiveValue_ShouldInitializeCorrectly()
    {

        var money = new Money(1000.50m);


        Assert.Equal(1000.50m, money.Value);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-100)]
    public void Constructor_WithZeroOrNegativeValue_ShouldThrowArgumentException(decimal invalidValue)
    {

        var exception = Assert.Throws<ArgumentException>(() => new Money(invalidValue));
        Assert.Equal("O valor monetário investido deve ser positivo.", exception.Message);
    }

    [Fact]
    public void Equals_WithNullMoney_ShouldReturnFalse()
    {

        var money = new Money(1000m);


        bool result = money.Equals((Money?)null);


        Assert.False(result);
    }

    [Fact]
    public void Equals_WithSameValue_ShouldReturnTrue()
    {

        var money1 = new Money(500m);
        var money2 = new Money(500m);


        bool result = money1.Equals(money2);


        Assert.True(result);
    }

    [Fact]
    public void Equals_WithDifferentValue_ShouldReturnFalse()
    {

        var money1 = new Money(500m);
        var money2 = new Money(600m);


        bool result = money1.Equals(money2);


        Assert.False(result);
    }

    [Fact]
    public void ObjectEquals_WithNullObject_ShouldReturnFalse()
    {

        var money = new Money(1000m);


        bool result = money.Equals((object?)null);


        Assert.False(result);
    }

    [Fact]
    public void ObjectEquals_WithDifferentType_ShouldReturnFalse()
    {

        var money = new Money(1000m);
        var ordinaryObject = new object();


        bool result = money.Equals(ordinaryObject);


        Assert.False(result);
    }

    [Fact]
    public void ObjectEquals_WithValidMoneyObject_ShouldEvaluateCorrectly()
    {

        var money1 = new Money(1000m);
        object money2 = new Money(1000m);


        bool result = money1.Equals(money2);


        Assert.True(result);
    }

    [Fact]
    public void GetHashCode_ShouldReturnSameHashCode_ForEqualValues()
    {

        var money1 = new Money(123.45m);
        var money2 = new Money(123.45m);


        Assert.Equal(money1.GetHashCode(), money2.GetHashCode());
    }

    [Fact]
    public void ImplicitOperator_FromMoneyToDecimal_ShouldConvertCorrectly()
    {

        var money = new Money(750m);


        decimal decimalValue = money;

        Assert.Equal(750m, decimalValue);
    }

    [Fact]
    public void ImplicitOperator_FromDecimalToMoney_ShouldConvertCorrectly()
    {

        decimal rawValue = 750m;


        Money money = rawValue;


        Assert.NotNull(money);
        Assert.Equal(750m, money.Value);
    }
}