import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Loan({ setPage, loan }) {
  const [plan, setPlan] = useState([]);
  const [years, setYears] = useState(25);

  var calcPlan = (rate, years, amount) => {
    console.log('calc');
    const interest = rate / 100 + 1
    let realAmount = amount * interest;
    const totalMonths = years * 12;
    const monthlyAmount = realAmount / totalMonths;

    const tempPlan = [];

    for (let month = totalMonths; month > 0; month--) {
      realAmount -= monthlyAmount;
      tempPlan.push({ remaining: realAmount, monthly: monthlyAmount });
    }
    setPlan(tempPlan);
  }

  useEffect(() => {
    calcPlan(loan.interestRate, years, 1000000);
  }, [years]);

  // const fetchPlan = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/loans/${loan.id}`);
  //     const data = await response.json();
  //     setPlan(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', color: '#fff', marginTop: '30px' }}>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h3" gutterBottom>
            {loan.name}
          </Typography>
        </Box>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h3" gutterBottom>
            {loan.interestRate}% rente
          </Typography>
        </Box>
        <Box sx={{ width: 300, marginTop: '20px' }}>
          <Slider
            onChange={(e, value) => setYears(parseInt(value))}
            value={years}
            aria-label="Antall år"
            defaultValue={years}
            valueLabelDisplay="on"
            valueLabelFormat={(num) => `${num} år`}
            step={1}
            marks
            min={1}
            max={35}
          />
        </Box>
      </div>
      {plan.length > 0 &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Gjenstående</TableCell>
                    <TableCell align="center">Månedlig beløp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plan.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{Math.round(row.remaining)}</TableCell>
                      <TableCell align="center">{Math.round(row.monthly)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      }
    </>
  );
}