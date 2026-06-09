using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CdbInvestment.API.Controllers;
using CdbInvestment.API.Dtos;
using CdbInvestment.Domain.Dtos;
using CdbInvestment.Domain.Services;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace CdbInvestment.Tests.CdbInvestment.API
{
    public class CdbInvestimentApiControllerTests
    {
        private readonly Mock<ILogger<CdbInvestimentApiController>> _loggerMock = new();
        private readonly Mock<ICdbInvestmentService> _cdbInvestmentServiceMock = new();
        public CdbInvestimentApiControllerTests()
        {
            _loggerMock = new Mock<ILogger<CdbInvestimentApiController>>();
            _cdbInvestmentServiceMock = new Mock<ICdbInvestmentService>();
        }
        [Fact]
        public async Task ProcessInvestmentAsync_ReturnsSuccess_WhenValid()
        {
            var request = new RequestDto
            {
                InvestedIncome = 1000,
                TermInMonths = 12
            };
            _cdbInvestmentServiceMock.Setup(s => s.ProcessInvestment(It.IsAny<ProcessCdbInvestimentRequest>()))
                .ReturnsAsync(new ProcessCdbInvestimentResponse
                {
                    Success = true,
                    GrossIncome = 1100,
                    NetIncome = 1050
                });
            var controller = new CdbInvestimentApiController(_loggerMock.Object, _cdbInvestmentServiceMock.Object);
            var result = await controller.ProcessInvestment(request);
            var okResult = Assert.IsType<Microsoft.AspNetCore.Mvc.OkObjectResult>(result);
            var response = Assert.IsType<ProcessCdbInvestimentResponse>(okResult.Value);
            Assert.True(response.Success);
            Assert.Equal(1100, response.GrossIncome);
            Assert.Equal(1050, response.NetIncome);
        }
    }
}