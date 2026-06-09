using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CdbInvestment.Domain.Dtos
{
    public class ProcessCdbInvestimentResponse
    {
        public string Message { get; set; }
        public bool Success { get; set; }
        public decimal GrossIncome { get; set; }
        public decimal NetIncome { get; set; }
    }
}