import React from "react";
import { useTable } from "react-table";
import Button from './Button';

export default function Table({ columns, data }) {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data
    });

    return (
        <div className="table">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th className="tableHeader" {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                            <th className="tableHeader">Delete</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td className="cell" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                                <td><Button value="x" className="link" /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
