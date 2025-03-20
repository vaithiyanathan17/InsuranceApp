import React from 'react';
import { useTable } from 'react-table';

const InsurancesTable = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {headerGroups.map(headerGroup => {
          const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={headerGroupKey} {...headerGroupProps}>
              {headerGroup.headers.map(column => {
                const { key: headerKey, ...headerProps } = column.getHeaderProps();
                return (
                  <th
                    key={headerKey}
                    {...headerProps}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
        {rows.map(row => {
          prepareRow(row);
          const { key: rowKey, ...rowProps } = row.getRowProps();
          return (
            <tr key={rowKey} {...rowProps} className="hover:bg-gray-100">
              {row.cells.map(cell => {
                const { key: cellKey, ...cellProps } = cell.getCellProps();
                return (
                  <td
                    key={cellKey}
                    {...cellProps}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InsurancesTable;