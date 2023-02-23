import React, { useEffect } from 'react';

function NewTable({ user, pricesObj }) {
  const getTotalPortfolioValue = () => {
    let totalValue = 0;
    const portfolio = user.portfolio;
    for (let obj of portfolio) {
      const company = obj.ticker;
      const shares = obj.shares;
      totalValue += shares * pricesObj[company];
    }
    return totalValue;
  };

  const totalPortfolioValue = getTotalPortfolioValue();

  const createRows = () => {
    const rows = [];
    const portfolio = user.portfolio;
    for (let obj of portfolio) {
      const company = obj.ticker;
      const shares = obj.shares;
      const value = (shares * pricesObj[company]).toFixed(1);
      const percentage =
        ((Number(value) / Number(totalPortfolioValue)) * 100).toFixed(1) + '%';
      rows.push([company, shares, value, percentage]);
    }
    return rows;
  };
  const rows = createRows();

  const cols = ['Company', 'Shares', 'Value', '% of Portfolio'];
  return (
    <div className='w-3/5 relative '>
      <table className='min-w-full rounded-lg shadow-lg leading-normal table-auto overflow-scroll'>
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
