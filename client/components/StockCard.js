import React, { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function StockCard({stock, price}) {
    const inputRef = useRef(null);
    const [qtyData, setQtyData] = useState(0);

    const handleBuyClick = () => {
        // update state with what user has put into the quantity field
        // inputRef.current.val is input value
        setQtyData(inputRef.current.value);
        // declare body and set equal to object with units as key and qtyData as value
        const body = {shares : qtyData}
        // make post request
        // DUMMY ROUTE. TO BE UPDATED
        fetch('/api/stocks/buy', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .catch(err => console.log(err));
    }

    const handleSellClick = () => {
        // update state with what user has put into the quantity field
        // inputRef.current.val is input value
        setQtyData(inputRef.current.value);
        // declare body and set equal to object with units as key and qtyData as value
        const body = {shares: qtyData}
        // make post request
        // DUMMY ROUTE. TO BE UPDATED
        fetch('/api/stocks/sell', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .catch(err => console.log(err));
    }
    
    return (
    <div className='flex  rounded-xl flex-col items-center gap-1 justify-between border border-black shadow-2xl p-4' id="cardContainer" >
      <div className='flex gap-2' id="companyStockPrice">
        <h2 className='text-xl underline mr-2' >{stock}</h2>
        <h2 className='text-xl font-mono font-bold' >{`$${price}`}</h2>
      </div>
   
      <input className='border text-center w-1/2 self-center ' ref={inputRef} type="number" id="quantity"/>

      <div className='flex gap-2' id="buySellContainer">
      <button className='border  rounded border-black bg-green-700 w-16 p-2 text-white hover:bg-green-600 shadow-2xl' onClick={handleBuyClick}>Buy</button>
      <button className='border rounded  border-black bg-red-700 w-16 p-2 text-white hover:bg-red-600 shadow-2xl' onClick={handleSellClick}>Sell</button>
      </div>
    </div>
  )
}

export default StockCard;