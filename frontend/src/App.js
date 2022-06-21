import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Loans from './Components/Header/Pages/Loans';
import Loan from './Components/Header/Pages/Loan';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [page, setPage] = useState(0);
  const [loans, setLoans] = useState(null);

  useEffect(() => {
    if (!loans) getLoans();
  }, []);

  const getLoans = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/loans`);
      const data = await response.json();
      setLoans(data);
    } catch (err) {
      console.log(err);
    }
  }

  const changePage = (pageNum) => {
    setPage(pageNum);
  }

  return (

    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Header setPage={changePage} />
        {page === 0 &&
          <Loans setPage={changePage} loans={loans} />
        }
        {page > 0 &&
          <Loan setPage={changePage} loan={loans.find(loan => loan.id === page)} />
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
