import React from 'react';
import StockCard from './StockCard';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import logos from './company_logos';

function StockCarousel({ stocks, pricesObj }) {
  const scrollLeft = () => {
    document.getElementById('content').scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById('content').scrollLeft += 400;
  };
  return (
    <div className='relative' id='carouselContainer'>
      <div className='text-center text-4xl p-1 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>
        Maui's Portfolio
      </div>
      <div className='absolute right-0 top-5 '>
        <button onClick={scrollLeft} className='p-2 m-2 rounded-full bg-white'>
          <FiChevronLeft className='text-3xl bg-black text-white border border-black rounded-full' />
        </button>
        <button onClick={scrollRight} className='p-2 m-2 rounded-full bg-white'>
          <FiChevronRight className='text-3xl bg-black text-white border border-black rounded-full' />
        </button>
      </div>
      <div
        id='content'
        className='carousel p-4 gap-6 flex items-center justify-start overflow-x-auto scroll-smooth scrollbar-hide'
      >
        {stocks.map((stock, idx) => (
          <StockCard
            key={idx}
            stock={stock}
            price={pricesObj[stock]}
            image={logos[stock]}
          />
        ))}
      </div>
    </div>
  );
}

export default StockCarousel;
