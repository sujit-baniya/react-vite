import {ColumnDef} from '~/core/components/table'
import {CellContext} from "@tanstack/table-core";

const VoteField = (ctx: CellContext<any, any>) => {
    const row = ctx.row.original
    return (
        <>
            {row.age >= 18 && <span className="text-green-700">Vote</span>}
            {row.age < 18 && <span className="text-red-300">N/A</span>}
        </>
    )
}

const ActionField = (ctx) => <></>

export const columns: ColumnDef[] = [
    {
        accessorKey: 'id',
        header: "ID",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {

        accessorKey: "lastName",
        header: "Last Name",
        id: "lastName",
    },
    {
        accessorFn: row => `${row.firstName} ${row.lastName}`,
        header: 'Full Name',
        accessorKey: "fullName",
        cell: info => info.getValue()
    },
    {
        accessorFn: row => `${row.age >= 18 ? 'Vote': 'N/A'}`,
        header: 'Valid Age for Vote',
        cell: VoteField,
    },
    {
        accessorKey: 'age',
        header: 'Age',
    },
    {
        accessorKey: 'visits',
        header: "Visits",
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'progress',
        header: 'Profile Progress',
    },
]