import React from 'react';

function UserInfo({ user, pricesObj }) {
  const getTotalPortfolioValue = () => {
    let totalValue = 0;
    const portfolio = user.portfolio;
    for (let obj of portfolio) {
      const company = obj.ticker;
      const shares = obj.shares;
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
      <h2 className='text-center text-2xl p-1 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>
        Portfolio Value:{' '}
        <span className='text-black'>{`$${totalPortfolioValue.toFixed(
          0
        )}`}</span>
      </h2>
      <h2 className='text-center text-2xl p-1 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>
        Available Funds:{' '}
        <span className='text-black'>{`$${Number(user.funds).toFixed(
          0
        )}`}</span>
      </h2>
    </div>
  );
}

export default UserInfo;
