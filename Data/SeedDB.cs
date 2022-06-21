using Microsoft.EntityFrameworkCore;
using ZData_Task.Models;

namespace ZData_Task.Data
{
    public class SeedDB
    {
        public static void Init(ZData_TaskContext context)
        {
            if (context.Loans.Any()) return;

            context.AddRange(
                new Loans {
                    Name = "Huslån",
                    InterestRate = 3.5f
                },
                new Loans
                {
                    Name = "Billån",
                    InterestRate = 6.8f
                },
                new Loans
                {
                    Name = "Forbrukslån",
                    InterestRate = 16.3f
                }
            );
            context.SaveChanges();
        }
    }
}
