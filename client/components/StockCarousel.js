import React from 'react'
// import Carousel from "react-elastic-carousel";
import StockCard from "./StockCard";

function StockCarousel({stocks, pricesObj}) {
  

    return (
    <div className='' id="carouselContainer">
      <div className='flex gap-4  w-screen overflow-auto '>
        {stocks.map((stock, idx) => (
          <StockCard key={idx} stock={stock} price={pricesObj[stock]}/>
        ))}
      </div>
    </div>
  )
}

export default StockCarousel;
