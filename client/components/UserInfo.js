import React from 'react'

function UserInfo({user}) {
const {portfolio, username, funds} = user;

const getTotalPortfolioValue = () => {
  const totalValue = 0;
  const portfolio = user.portfolio;
  for (let obj of portfolio) {
    const company = Object.keys(obj)[0];
    const shares = obj[company];
    totalValue += shares * pricesObj[company];
  }
  return totalValue; }

  return (
    <div id="userInfoContainer">
      <h2>Portfolio Value: {portfolioValue}</h2>
      <h2>Available Funds: {availableFunds}</h2>
    </div>
  )
}

export default UserInfo
