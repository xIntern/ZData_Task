using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ZData_Task.Models;

namespace ZData_Task.Data
{
    public class ZData_TaskContext : DbContext
    {
        public ZData_TaskContext(DbContextOptions<ZData_TaskContext> options)
            : base(options)
        {
            SeedDB.Init(this);
        }

        public DbSet<Loans>? Loans { get; set; }
    }
}
