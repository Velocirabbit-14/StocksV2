import React from 'react'
// import Carousel from "react-elastic-carousel";
import StockCard from "./StockCard";

function StockCarousel({stocks, pricesObj}) {

    return (
    <div id="carouselContainer">
      <Carousel>
        {stocks.map((stock, idx) => (
          <StockCard key={idx} stock={stock} price={pricesObj[stock]}/>
        ))}
      </Carousel>
    </div>
  )
}

export default StockCarousel;
