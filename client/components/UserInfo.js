import React from 'react';

function UserInfo({ user, pricesObj }) {


  const getTotalPortfolioValue = () => {
   
    let totalValue = 0;
    const portfolio = user.portfolio;
    for (let obj of portfolio) {
      const company = Object.keys(obj)[0];
      const shares = obj[company];
      totalValue += shares * pricesObj[company];
    }
    return totalValue;
  };
  const totalPortfolioValue = getTotalPortfolioValue();



  return (
    <div
      className='text-xl bg-white rounded-lg shadow-lg p-4'
      id='userInfoContainer'
    >
      <h2>Portfolio Value: {`$${totalPortfolioValue.toFixed(0)}`}</h2>
      <h2>Available Funds: {`$100`}</h2>
    </div>
  );
}

export default UserInfo;
