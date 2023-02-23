import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import * as React from 'react';

export default function PortfolioTable({ user, pricesObj }) {

  
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
        const value = shares * pricesObj[company];
        const percentage = Number(value) / Number(totalPortfolioValue);
        rows.push({ company, shares, value, percentage });
      }
      return rows;
    };
    const rows = createRows();



  const columns = [
    { id: 'company', label: 'Company', minWidth: 170 },
    { id: 'shares', label: 'Shares', minWidth: 100 },
    {
      id: 'value',
      label: '$',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'percentage',
      label: '% of Portfolio',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <Paper sx={{ width: '75%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
