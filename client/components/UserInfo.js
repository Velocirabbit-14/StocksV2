import React from 'react'

function UserInfo({user}) {
  return (
    <div id="userInfoContainer">
      <h2>Portfolio Value: {portfolioValue}</h2>
      <h2>Available Funds: {availableFunds}</h2>
    </div>
  )
}

export default UserInfo
