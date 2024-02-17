// import React, { useEffect, useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
// import { ClientDetailsType } from '../../types/clientDetailsObj';
// import { AdminAuth } from '../../hooks/useAdminAuthContext';
// import axios from 'axios';
// import { BASE_URL } from '../../libs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../shadcn-components/ui/table"
// import { Button } from '../../shadcn-components/ui/button';
// import { IoChevronBack, IoChevronForward } from 'react-icons/io5';


interface ReactTableProps<TData, TValue> {
columns: ColumnDef<TData, TValue>[]
data: TData[]
}

export function UserTable<TData, TValue>({columns, data}: ReactTableProps<TData, TValue>) {


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
      })
  


      return (
        <>
            <div className="rounded-md border overflow-hidden overflow-x-hidden">
                <Table className=''>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className='text-[.6rem] lg:text-[.9rem] bg-'>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead 
                                key={header.id} 
                                className='font-bold text-center'
                                style={{ width: `${100 / headerGroup.headers.length}%` }}
                            >
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className='text-[.5rem] sm:text-[.6rem] lg:text-[.9rem] bg-white mb-2 text-center'
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell 
                                key={cell.id}
                                style={{ width: `${100 / row.getVisibleCells().length}%` }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell  className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div> 

            <div className="mt-4 flex items-center justify-center gap-2 md:gap-4 text-white text-[.6rem] md:text-[.8rem]">
                <button onClick={() => table.setPageIndex(0)} className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.8rem]">First Page </button>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.8rem] disabled:bg-blue-400">Previous Page</button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.8rem] disabled:bg-blue-400">Next Page</button>
                <div onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="bg-primary text-white py-1 px-1 xs:py-2 xs:px-3 rounded-xl text-[.8rem]">Last Page</div>
                
            </div>
            

        
        {/* <div className="overflow-x-auto max-w-full rounded-md mt-8 box-border">
            <table className="w-full border-collapse">

                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className='text-[.6rem] lg:text-[.9rem]'>
                        {headerGroup.headers.map((header) => {
                            return (
                            <th key={header.id} className='py-2 px-4 text-left'>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </th>
                            )
                        })}
                        </tr>
                    ))}
                </thead>

                    <tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className='text-[.5rem] sm:text-[.6rem] lg:text-[.9rem] border-b'
                            >
                                {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className='px-4 py-1 my-2'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                                ))}
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan={columns.length} className=" text-center px-4 py-1 my-2">
                                No results.
                            </td>
                            </tr>
                        )}
                    </tbody>
            </table>
        </div>

        <div className="mt-4 flex items-center gap-4 text-white">
            <Button onClick={() => table.setPageIndex(0)}>First Page</Button>
            <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous Page</Button>
            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next Page</Button>
            <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</Button>
        </div> */}


        </>



      )
}

// export default reactTable