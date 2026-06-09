using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CdbInvestment.Domain.Dtos
{
    public class ProcessCdbInvestimentRequest
    {
        public decimal InvestedAmount { get; set; }
        public int TermInMonths { get; set; }
    }
}