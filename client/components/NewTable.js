import React, { useEffect } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function NewTable({ user, pricesObj }) {
  const img1 =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNvPsZj-m1KknF2LqmIBJY8F2kCiZSVMBEUg&usqp=CAU';


      const getTotalPortfolioValue = () => {
        let totalValue = 0;
        const portfolio = user.portfolio;
        for (let obj of portfolio) {
          const company = Object.keys(obj)[0];
          const shares = obj[company];
          totalValue += shares * pricesObj[company];
        }
        return totalValue;
      };
    
      const totalPortfolioValue = getTotalPortfolioValue();
    
      const createRows = () => {
        const rows = [];
        const portfolio = user.portfolio;
        for (let obj of portfolio) {
          const company = Object.keys(obj)[0];
          const shares = obj[company];
          const value = (shares * pricesObj[company]).toFixed(1);
          const percentage =
            ((Number(value) / Number(totalPortfolioValue)) * 100).toFixed(1) + '%';
          const increase = img1;
          rows.push([company, shares, value, percentage, <ShowChartIcon />]);
        }
        return rows;
      };
     const rows = createRows();

  
  const cols = ['Company', 'Shares', 'Value', '% of Portfolio', 'Return'];
  return (
    <div className='w-3/5 relative '>
      <table className='min-w-full rounded-lg shadow-lg leading-normal '>
        <thead className='px-5 py-3 rounded-lg bg-black text-center text-lg font-semibold text-white uppercase'>
          <tr>
            {cols.map((header) => (
              <th className=''>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className=''>
          {rows.map((arr) => (
            <tr className='text-center'>
              {cols.map((_, idx) => (
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-lg tracking-wider'>
                  {arr[idx]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewTable;
