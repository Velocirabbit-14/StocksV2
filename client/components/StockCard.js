import React, { useRef, useState, useEffect } from 'react';

function StockCard({ stock, price, image }) {
  const inputRef = useRef(null);
  const [qtyData, setQtyData] = useState(0);

  const handleBuyClick = () => {
    // update state with what user has put into the quantity field
    // inputRef.current.val is input value
    setQtyData(inputRef.current.value);
    // declare body and set equal to object with units as key and qtyData as value
    const body = { shares: qtyData };
    // make post request
    // DUMMY ROUTE. TO BE UPDATED
    fetch('/api/stocks/buy', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((user) => {
        const { portfolio } = user;
        // DO SOMETHING WITH THIS
      })
      .catch((err) => console.log(err));
  };

  const handleSellClick = () => {
    // THIS WILL BE SAME CODE AS HANDLEBUY CLICK
  };

  return (
    <>
      <div
        className='flex rounded-xl flex-col items-center gap-2 justify-between bg-white rounded-lg shadow-lg p-4'
        id='cardContainer'
      >
        <div className='flex items-center gap-2' id='companyStockPrice'>
          <h2 className='text-xl font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent mr-2'>
            {stock}
          </h2>
          <h2 className='text-md font-mono font-bold'>{`$${price}`}</h2>
        </div>
        <img className='w-[85px] h-[50px] object-cover' src={image} />
        <input
          className='border border-black rounded text-center w-1/2 self-center '
          ref={inputRef}
          type='number'
          id='quantity'
          min='0'
        />
        <label for='quantity'>Qty</label>
        <div className='flex gap-2' id='buySellContainer'>
          <button
            className='border font-bold rounded border-black bg-green-600 w-16 p-2 text-white hover:bg-green-600 shadow-2xl'
            onClick={handleBuyClick}
          >
            Buy
          </button>
          <button
            className='border rounded font-bold border-black bg-red-600 w-16 p-2 text-white hover:bg-red-600 shadow-2xl'
            onClick={handleSellClick}
          >
            Sell
          </button>
        </div>
      </div>
    </>
  );
}

export default StockCard;
