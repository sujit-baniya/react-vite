import { Column, RowData, Table } from '~/core/components/table'
import React from 'react'
import DebouncedInput from './DebouncedInput'

type NumberInputProps = {
    columnFilterValue: [number, number]
    getFacetedMinMaxValues: () => [number, number] | undefined
    setFilterValue: (updater: any) => void
    setPageIndex: any
}

const NumberInput: React.FC<NumberInputProps> = ({
                                                     columnFilterValue,
                                                     getFacetedMinMaxValues,
                                                     setFilterValue,
                                                     setPageIndex
                                                 }) => {
    const minOpt = getFacetedMinMaxValues()?.[0]
    const min = Number(minOpt ?? '')

    const maxOpt = getFacetedMinMaxValues()?.[1]
    const max = Number(maxOpt ?? '')

    return (
        <div>
            <div className="flex space-x-2">
                <DebouncedInput
                    type="number"
                    min={min}
                    max={max}
                    value={columnFilterValue?.[0] ?? ''}
                    onChange={value => {

                        setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }}
                    placeholder={`Min ${minOpt ? `(${min})` : ''}`}
                    className="w-24 border shadow rounded text-xs font-light !py-1 min-w-24 pl-2"
                />
                <DebouncedInput
                    type="number"
                    min={min}
                    max={max}
                    value={columnFilterValue?.[1] ?? ''}
                    onChange={value => {
                        if (setPageIndex) {
                            setPageIndex((1))
                        }
                        setFilterValue((old: [number, number]) => [old?.[0], value])
                    }}
                    placeholder={`Max ${maxOpt ? `(${max})` : ''}`}
                    className="w-24 border shadow rounded text-xs font-light !py-1 min-w-24 pl-2"
                />
            </div>
            <div className="h-1" />
        </div>
    )
}

type TextInputProps = {
    columnId: string
    columnFilterValue: string
    columnSize: number
    setFilterValue: (updater: any) => void
    sortedUniqueValues: any[]
    setPageIndex: any
    disableAutocomplete: boolean
}

const TextInput: React.FC<TextInputProps> = ({
                                                 columnId,
                                                 columnFilterValue,
                                                 columnSize,
                                                 setFilterValue,
                                                 sortedUniqueValues,
                                                setPageIndex,
                                                 disableAutocomplete,
                                             }) => {
    const dataListId = columnId + 'list'

    return (
        <React.Fragment>
            <datalist id={dataListId}>
                {!disableAutocomplete && sortedUniqueValues.slice(0, 5000).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="search"
                value={columnFilterValue ?? ''}
                onChange={value => setFilterValue(value)}
                placeholder={`Search... (${columnSize})`}
                className="w-52 border shadow rounded text-xs font-light !py-1 min-w-32 pl-2"
                list={dataListId}
            />
            <div className="h-1" />
        </React.Fragment>
    )
}

type Props<T extends RowData> = {
    column: Column<T, unknown>
    table: Table<T>
    disableAutocomplete: boolean
}

export function Filter<T extends RowData>({ column, table, disableAutocomplete }: Props<T>) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()
    const uniqueValues = column.getFacetedUniqueValues()

    const sortedUniqueValues = React.useMemo(
        () =>
            typeof firstValue === 'number'
                ? []
                : Array.from(uniqueValues.keys()).sort(),
        [uniqueValues]
    )

    return typeof firstValue === 'number' ? (
        <NumberInput
            columnFilterValue={columnFilterValue as [number, number]}
            getFacetedMinMaxValues={column.getFacetedMinMaxValues}
            setFilterValue={column.setFilterValue}
            setPageIndex={table.setPageIndex}
        />
    ) : (
        <TextInput
            columnId={column.id}
            columnFilterValue={columnFilterValue as string}
            columnSize={uniqueValues.size}
            setFilterValue={column.setFilterValue}
            sortedUniqueValues={sortedUniqueValues}
            setPageIndex={table.setPageIndex}
            disableAutocomplete={disableAutocomplete}
        />
    )
}

export default Filter
