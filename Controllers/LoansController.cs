using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZData_Task.Data;
using ZData_Task.Models;

namespace ZData_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly ZData_TaskContext _context;

        public LoansController(ZData_TaskContext context)
        {
            _context = context;
        }

        // GET: api/Loans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loans>>> GetLoansModel()
        {
          if (_context.Loans == null)
          {
              return NotFound();
          }
            return await _context.Loans.ToListAsync();
        }

        // GET: api/Loans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Loans>> GetLoansModel(int id)
        {
          if (_context.Loans == null)
          {
              return NotFound();
          }
            var loansModel = await _context.Loans.FindAsync(id);

            if (loansModel == null)
            {
                return NotFound();
            }



            return loansModel;
        }

        // PUT: api/Loans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoansModel(int id, Loans loansModel)
        {
            if (id != loansModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(loansModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoansModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Loans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Loans>> PostLoansModel(Loans loansModel)
        {
          if (_context.Loans == null)
          {
              return Problem("Entity set 'ZData_TaskContext.LoansModel'  is null.");
          }
            _context.Loans.Add(loansModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoansModel", new { id = loansModel.Id }, loansModel);
        }

        // DELETE: api/Loans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoansModel(int id)
        {
            if (_context.Loans == null)
            {
                return NotFound();
            }
            var loansModel = await _context.Loans.FindAsync(id);
            if (loansModel == null)
            {
                return NotFound();
            }

            _context.Loans.Remove(loansModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoansModelExists(int id)
        {
            return (_context.Loans?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
