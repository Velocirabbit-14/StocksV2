import React, { useState, useEffect } from 'react';
import PortfolioTable from './PortfolioTable';
import UserInfo from './UserInfo';
import Login from './Login';
// import fetch from 'node-fetch';
import StockCarousel from './StockCarousel';
// import UserInfo from './UserInfo';

export default function App() {


  //******************* state state state ******************************/
  const stocks = ['AAPL', 'MSFT', 'AMZN', 'TSLA', 'GOOGL', 'META', 'YELP', 'ADBE', 'BABA', 'SONY']
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    portfolio:[{'AAPL': 2},{'AMZN':5}, {'TSLA':7}]
  });
  const [data, setData] = useState(null);


  //********************* fetch requests ******************************//
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


if(data === null){
  return <div>loading</div>
}

  const getPrices = () => {
    const pricesObj = {};
    for (let i = 0; i < stocks.length; i++) {
      const key = stocks[i];
      const price = data[i].c;
      pricesObj[key] = price
    }
    return pricesObj;
  }
console.log(data)
  return (
    <div className='w-screen h-screen'>
      {/* <Login setUser={setUser} setLoggedIn={setLoggedIn}/> */}
     
      <StockCarousel stocks={stocks} pricesObj={getPrices(data)}/>
      <div className='flex justify-between p-16'>
      <div>
      <UserInfo user={user} pricesObj={getPrices(data)}/>
      </div>
      <PortfolioTable user={user} pricesObj={getPrices(data)}/>
      </div>
    </div>
  );
}





