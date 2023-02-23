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
  const mauiImage =
    'https://ca.slack-edge.com/T0464QV57N0-U04AURBV6JX-558ce6667654-192';
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
  const [user, setUser] = useState({
    portfolio: [{ AAPL: 7 }, { AMZN: 12 }, { TSLA: 7 }, { META: 5 }],
  });
  const [data, setData] = useState(null);

  // ********************* fetch requests ******************************//
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
    return <div>loading</div>;
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
  console.log(data);
  return (
    <>
      {/* <Login setUser={setUser} setLoggedIn={setLoggedIn}/> */}
      <div className='w-screen h-screen flex flex-col justify-center items-center bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500'>
        <div className='absolute right-10 top-5'>
          <Avatar src={mauiImage} />
        </div>

        <div className='w-5/6 h-5/6 border rounded-2xl shadow-lg bg-white '>
          <StockCarousel stocks={stocks} pricesObj={getPrices(data)} />
          <div className='flex justify-between p-16'>
            <div>
              <UserInfo user={user} pricesObj={getPrices(data)} />
            </div>
            <NewTable user={user} pricesObj={getPrices(data)} />
            {/* <PortfolioTable user={user} pricesObj={getPrices(data)} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
