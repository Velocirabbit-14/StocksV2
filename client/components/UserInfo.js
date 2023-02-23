import React from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
function UserInfo({user, pricesObj}) {
const {portfolio, username, funds} = user;

const getTotalPortfolioValue = () => {
  const totalValue = 0;
  const portfolio = portfolio;
  for (let obj of portfolio) {
    const company = Object.keys(obj)[0];
    const shares = obj[company];
    totalValue += shares * pricesObj[company];
  }
  return totalValue; }

  return (
    <div className="border rounded border-slate-500 p-8" id="userInfoContainer">
    <AccountCircleRoundedIcon />
      <h2>Portfolio Value: {getTotalPortfolioValue}</h2>
      <h2>Available Funds: {funds}</h2>
    </div>
  )
}

export default UserInfo
