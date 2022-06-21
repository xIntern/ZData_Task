import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Loans({ loans, setPage }) {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}>
      {loans && loans.map(loan => 
        <Box key={loan.id}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                {loan.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {loan.interestRate}% rente
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => setPage(loan.id)} size="small">Velg</Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </div>
  );
}