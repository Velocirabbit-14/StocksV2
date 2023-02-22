import React from 'react'
// import Carousel from "react-elastic-carousel";
import StockCard from "./StockCard";

function StockCarousel({stocks}) {
    // we need to pass down price as well
    return (
    <div>
      <Carousel>
        {stocks.map((stock, idx) => (
          <StockCard key={idx} stock={stock}/>
        ))}
      </Carousel>
    </div>
  )
}

export default StockCarousel;
