import React, { useState } from "react";
import {
    useTable,
    useSortBy,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    usePagination
} from "react-table";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { BiDetail } from 'react-icons/bi';

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200);

    return (
        <span>
            {/* Search:{' '} */}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                // placeholder={`${count} records...`}
                placeholder={'search...'}
                className="searchTable"
            />
        </span>
    )
}

export default function Table({
    columns,
    data,
    handleClick,
    handleEdit,
    isOrder,
    handleShow,
    hideActions,
    handleToggleMailingList,
    mailingList,
    hidePagination,
    hideEdit
}) {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <div>
            <div className="table">
                <table {...getTableProps()}>
                    <thead>
                        <tr>
                            <th
                                colSpan={visibleColumns.length}
                                style={{
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                <GlobalFilter
                                    preGlobalFilteredRows={preGlobalFilteredRows}
                                    globalFilter={state.globalFilter}
                                    setGlobalFilter={setGlobalFilter}
                                />
                            </th>
                        </tr>
                        {headerGroups.map(headerGroup => (
                            <tr className="rowHeader" {...headerGroup.getHeaderGroupProps()}>
                                {mailingList && <th className="action"></th>}
                                {headerGroup.headers.map(column => (
                                    <th className={column.getHeaderProps().key.includes("action") ? "action" : "tableHeader"}
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                )
                                )}
                                <th className="action"></th>
                                {!hideEdit && <th className="action"></th>}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        mailingList &&
                                        <td className="action">
                                            <input
                                                type="checkbox"
                                                name="mailingList"
                                                onChange={() => handleToggleMailingList(row.original)}
                                            >
                                            </input>
                                        </td>
                                    }
                                    {row.cells.map(cell => {
                                        return <td className={cell.getCellProps().key.includes("action") ? "action" : "cell"}{...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                    {!hideActions && <td className="action">
                                        <RiDeleteBin6Line
                                            className="icon"
                                            onClick={() => handleClick(row.original)}
                                        />
                                    </td>}
                                    {
                                        !hideActions &&
                                        (isOrder ?
                                            <td className="action">
                                                <BiDetail
                                                    className="icon"
                                                    onClick={() => handleShow(row.original)}
                                                />
                                            </td> :
                                            (!hideEdit && <td className="action">
                                                <GrEdit
                                                    className="icon"
                                                    onClick={() => handleEdit(row.original)}
                                                />
                                            </td>)
                                        )
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >
            {!hidePagination &&
                <div className="pagination">
                    <div>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>{' '}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>{' '}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>{' '}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button>{' '}
                    </div>
                    <span>
                        Page{' '}
                        <strong>
                            {state.pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <div>
                        |
                </div>
                    <span>
                        Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={state.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                    <select
                        value={state.pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            }
        </div >
    );
}
