import React, { useState, useEffect } from 'react';
import PortfolioTable from './PortfolioTable';
import UserInfo from './UserInfo';
import Avatar from '@mui/material/Avatar';
import Login from './Login';
import StockCarousel from './StockCarousel';
import NewTable from './NewTable';
// import UserInfo from './UserInfo';

export default function App() {
  //******************* state state state ******************************/
  const stocks = [
    'AAPL',
    'MSFT',
    'AMZN',
    'TSLA',
    'META',
    'YELP',
    'BABA',
    'ADBE',
    'SONY',
    'GOOGL',
  ];
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [data, setData] = useState(null);

  // ********************* fetch requests ******************************//

  useEffect(() => {
    async function checkSession() {
      let res = await fetch('/api/user/session');
      res = await res.json();
      console.log(res);
      if (res.user) {
        setUser(res);
        setLoggedIn(true);
      }
    }
    checkSession();
  }, []);

  useEffect(() => {
    async function getData(stocks) {
      const results = [];
      for (let ticker of stocks) {
        let res = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=cfr5k41r01qhg1uraumgcfr5k41r01qhg1uraun0`,
          {
            method: 'GET',
          }
        );
        res = await res.json();
        results.push(res);
      }
      setData(results);
    }
    getData(stocks);
  }, []);

  if (!data) {
    return <div class='text-center'>loading...</div>;
  }

  const getPrices = () => {
    const pricesObj = {};
    for (let i = 0; i < stocks.length; i++) {
      const key = stocks[i];
      const price = data[i].c;
      pricesObj[key] = price;
    }
    return pricesObj;
  };

  return (
    <>
      {!loggedIn ? (
        <Login setUser={setUser} setLoggedIn={setLoggedIn} />
      ) : (
        <div className='w-screen h-screen flex flex-col justify-center items-center bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500'>
          <div className='absolute right-10 top-5'>
            <Avatar />
          </div>

          <div className='w-5/6 h-5/6 border rounded-2xl shadow-lg bg-white '>
            <StockCarousel
              user={user}
              stocks={stocks}
              setUser={setUser}
              pricesObj={getPrices(data)}
            />
            <div className='flex justify-between items-center gap-6 p-16 h-3/5 '>
              <div className=' w-2/5 h-4/5'>
                <UserInfo user={user} pricesObj={getPrices(data)} />
              </div>
              <div className='w-3/5 h-full  overflow-auto'>
                <NewTable user={user} pricesObj={getPrices(data)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
