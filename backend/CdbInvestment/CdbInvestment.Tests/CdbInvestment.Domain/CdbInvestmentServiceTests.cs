using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CdbInvestment.Domain.Dtos;
using CdbInvestment.Domain.Services;
using Xunit;

namespace CdbInvestment.Tests.CdbInvestment.Domain
{
    public class CdbInvestmentServiceTests
    {
        private readonly CdbInvestmentService _service;
        public CdbInvestmentServiceTests()
        {
            _service = new CdbInvestmentService();
        }

        [Theory]
        [InlineData(2, 1019.53, 1015.14)]
        [InlineData(3, 1029.44, 1022.82)]
        [InlineData(4, 1039.45, 1030.57)]
        [InlineData(5, 1049.55, 1038.40)]
        [InlineData(6, 1059.76, 1046.31)]
        [InlineData(7, 1070.06, 1056.05)]
        [InlineData(8, 1080.46, 1064.37)]
        [InlineData(9, 1090.96, 1072.77)]
        [InlineData(10, 1101.56, 1081.25)]
        [InlineData(11, 1112.27, 1089.82)]
        [InlineData(12, 1123.08, 1098.46)]
        [InlineData(13, 1134.00, 1110.55)]
        [InlineData(14, 1145.02, 1119.64)]
        [InlineData(15, 1156.15, 1128.82)]
        [InlineData(16, 1167.39, 1138.10)]
        [InlineData(17, 1178.74, 1147.46)]
        [InlineData(18, 1190.19, 1156.91)]
        [InlineData(19, 1201.76, 1166.45)]
        [InlineData(20, 1213.44, 1176.09)]
        [InlineData(21, 1225.24, 1185.82)]
        [InlineData(22, 1237.15, 1195.65)]
        [InlineData(23, 1249.17, 1205.57)]
        [InlineData(24, 1261.31, 1215.58)]
        [InlineData(25, 1273.57, 1232.53)]
        [InlineData(26, 1285.95, 1243.06)]
        [InlineData(27, 1298.45, 1253.68)]
        [InlineData(28, 1311.07, 1264.41)]
        [InlineData(29, 1323.82, 1275.25)]
        [InlineData(30, 1336.68, 1286.18)]
        public async Task ProcessInvestmentAsync_ReturnsExpectedResult_WhenValidRequestIsProvided(
            int termInMonths,
            decimal expectedGross,
            decimal expectedNet)
        {
            var request = new ProcessCdbInvestimentRequest
            {
                InvestedAmount = 1000,
                TermInMonths = termInMonths
            };

            var result = await _service.ProcessInvestment(request);

            Assert.True(result.Success);
            Assert.Equal(expectedGross, result.GrossIncome);
            Assert.Equal(expectedNet, result.NetIncome);
        }

        [Fact]
        public async Task ProcessInvestmentAsync_ReturnsExpectedResult_WhenInvalidInvestedAmountIsProvided()
        {
            var request = new ProcessCdbInvestimentRequest
            {
                InvestedAmount = 0,
                TermInMonths = 12
            };
            var result = await _service.ProcessInvestment(request);
            Assert.False(result.Success);
            Assert.Equal("O valor monetário investido deve ser positivo.", result.Message);
        }
        [Fact]
        public async Task ProcessInvestmentAsync_ReturnsExpectedResult_WhenInvalidTermInMonthsIsProvided()
        {
            var request = new ProcessCdbInvestimentRequest
            {
                InvestedAmount = 1000,
                TermInMonths = 1
            };
            var result = await _service.ProcessInvestment(request);
            Assert.False(result.Success);
            Assert.Equal("O prazo em meses para resgate deve ser maior que 1.", result.Message);
        }
    }
}