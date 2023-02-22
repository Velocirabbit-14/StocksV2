import React, { useState, useEffect } from 'react';
import PortfolioTable from './PortfolioTable';
import UserInfo from './UserInfo';
import Login from './Login';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import StockCarousel from './StockCarousel';
import UserInfo from './UserInfo';

export default function App() {


  //******************* state state state ******************************/
  const stocks = ['AAPL', 'MSFT', 'AMZN', 'TSLA', 'GOOGL', 'META', 'YELP', 'ADBE', 'BABA', 'SONY']
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [data, setData] = useState(null);


  // ********************* fetch requests ******************************//
  useEffect(() => {
    async function getData(stocks) {
      const results = [];
      for (let ticker of stocks) {
        let res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=cfr5k41r01qhg1uraumgcfr5k41r01qhg1uraun0`, {
          method: 'GET'
        })
        res = await res.json();
        results.push(res);
      }
      setData(results);
    }
    getData(stocks);
  }, []);

  const getPrices = (stocks, data) => {
    const pricesObj = {};
    for (let i = 0; i < stocks.length; i++) {
      const key = stocks[i];
      const price = data[i].c;
      pricesObj[key] = price
    }
    return pricesObj;
  }

  return (
    <div>
      {/* <Login setUser={setUser} setLoggedIn={setLoggedIn}/> */}
      <AccountCircleRoundedIcon />
      <StockCarousel stocks={stocks} pricesObj={getPrices(data)}/>
      <UserInfo user={user}/>
      <PortfolioTable user={user} pricesObj={getPrices(data)}/>
    </div>
  );
}
