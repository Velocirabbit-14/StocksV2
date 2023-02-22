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
        const body = {units : qtyData}
        // make post request
        // DUMMY ROUTE. TO BE UPDATED
        fetch('/user/buy', {
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
        const body = {units : qtyData}
        // make post request
        // DUMMY ROUTE. TO BE UPDATED
        fetch('/user/sell', {
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
    <div id="cardContainer" className="">
      <div id="companyStockPrice">
        <h2>stock</h2>
        <h2>price</h2>
      </div>
      <div id="quantityContainer">
      <input ref={inputRef} type="number" id="quantity"/>
      </div>
      <div id="buySellContainer">
      <Button onClick={handleBuyClick}>Buy</Button>
      <Button onClick={handleSellClick}>Sell</Button>
      </div>
    </div>
  )
}

export default StockCard;