import {
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getGroupedRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    GroupingState,
    useReactTable,
} from '~/core/components/table/index'
import React from 'react'

import DebouncedInput from './components/DebouncedInput'
import ActionButtons from './components/ActionButtons'
import CustomTable from './components/CustomTable'
import Checkbox from "~/core/components/table/components/Checkbox";
import {FilterFn} from "@tanstack/table-core";
import {rankItem} from "~/core/components/table/match-sorter";

const Buttons = ({
                     table,
                     rowSelection,
                     canToggleColumns,
                     canGlobalFilter,
                     globalFilter,
                     handleGlobalFilter,
                     canPaginate,
                     canChangeInterval,
                 }) => {
    return (
        <ActionButtons
            getSelectedRowModel={table.getSelectedRowModel}
            hasNextPage={table.getCanNextPage()}
            hasPreviousPage={table.getCanPreviousPage()}
            nextPage={table.nextPage}
            pageCount={table.getPageCount()}
            pageIndex={table.getState().pagination.pageIndex}
            pageSize={table.getState().pagination.pageSize}
            previousPage={table.previousPage}
            rowSelection={rowSelection}
            setPageIndex={table.setPageIndex}
            setPageSize={table.setPageSize}
            totalRows={table.getPrePaginationRowModel().rows.length}
            table={table}
            canToggleColumns={canToggleColumns}
            canPaginate={canPaginate}
            canChangeInterval={canChangeInterval}
        >
            {canGlobalFilter && (
                <div>
                    <DebouncedInput
                        type="search"
                        value={globalFilter ?? ""}
                        onChange={handleGlobalFilter}
                        className="mx-1 p-2 text-sm border border-gray-200 rounded bg-white min-w-48"
                        placeholder="Search all columns..."
                    />
                </div>
            )}
        </ActionButtons>
    );
};

export const Table = ({
                        canGlobalFilter = true,
                        canResizeColumn = false,
                        canMoveColumn = false,
                        canPinColumn = false,
                        sortable = true,
                        canGroupColumn = false,
                        canColumnFilter = true,
                        canToggleColumns = true,
                        controlPosition = "both",
                        rows = [],
                        columns = [],
                        selectableWithCheckbox = false,
                        className = "",
                        title = "Data Collection",
                        canPaginate = true,
                        canChangeInterval = true,
                          disableAutocomplete = false,
                        pagination = {
                            pageSize: 20,
                            pageIndex: 0
                        }
                    }) => {
    pagination.pageIndex == pagination.pageIndex || 0
    pagination.pageSize == pagination.pageSize || 20
    const [data, setData] = React.useState(rows);
    if (selectableWithCheckbox) {
        columns = [
            // @ts-ignore
            {
                size: 80,
                id: "idx_table",
                header: ({ table }) => {
                    return (
                        <div className="px-4">
                            <Checkbox
                                checked={table.getIsAllRowsSelected()}
                                indeterminate={table.getIsSomeRowsSelected()}
                                onChange={table.getToggleAllRowsSelectedHandler()}
                            />
                            <span className="inline-block pl-2">#</span>
                        </div>
                    );
                },
                cell: ({ row }) => (
                    <div className="px-4">
                        <Checkbox
                            checked={row.getIsSelected()}
                            indeterminate={row.getIsSomeSelected()}
                            onChange={row.getToggleSelectedHandler()}
                        />
                    </div>
                ),
                enableSorting: false
            },
            ...columns
        ];
    }
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [grouping, setGrouping] = React.useState<GroupingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnPinning, setColumnPinning] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        onColumnVisibilityChange: setColumnVisibility,
        onGroupingChange: setGrouping,
        onColumnPinningChange: setColumnPinning,
        onRowSelectionChange: setRowSelection,
        state: {
            grouping,
            columnFilters,
            globalFilter,
            columnVisibility,
            columnPinning,
            rowSelection
        },
        debugTable: false,
        debugHeaders: false,
        debugColumns: false,
        filterFns: undefined,
        initialState: {
            pagination: pagination
        }
    });
    const handleGlobalFilter = (value) => {
        setGlobalFilter(String(value));
    };

    return (
        <div className={`grid ${className}`}>

            <h1 className="font-semibold ml-2">{title}</h1>
            {(controlPosition === "both" || controlPosition === "top") &&
                <Buttons
                    table={table}
                    rowSelection={rowSelection}
                    canToggleColumns={canToggleColumns}
                    canGlobalFilter={canGlobalFilter}
                    canPaginate={canPaginate}
                    canChangeInterval={canChangeInterval}
                    globalFilter={globalFilter}
                    handleGlobalFilter={handleGlobalFilter}
                />
            }
            <div className={`h-full w-full overflow-auto slim-scrollbar`}>
                <CustomTable
                    table={table}
                    canResizeColumn={canResizeColumn}
                    canMoveColumn={canMoveColumn}
                    canPinColumn={canPinColumn}
                    sortable={sortable}
                    canGroupColumn={canGroupColumn}
                    canColumnFilter={canColumnFilter}
                    disableAutocomplete={disableAutocomplete}
                    className="w-100"
                />
            </div>
            {(controlPosition === "both" || controlPosition === "bottom") && (
                <Buttons
                    table={table}
                    rowSelection={rowSelection}
                    canToggleColumns={canToggleColumns}
                    canGlobalFilter={canGlobalFilter}
                    canPaginate={canPaginate}
                    canChangeInterval={canChangeInterval}
                    globalFilter={globalFilter}
                    handleGlobalFilter={handleGlobalFilter}
                />
            )}
        </div>
    );
};

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta(itemRank);
    return itemRank.passed;
};

export default Table;
