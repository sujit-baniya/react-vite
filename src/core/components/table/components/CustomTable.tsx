import {
	flexRender,
	HeaderGroup,
	Row,
	RowData,
	Table
} from "~/core/components/table";
import Filter from "./Filter";
import TablePins from "./TablePins";
import { FaSortUp, FaSortDown, FaSort, AiOutlineUngroup, AiOutlineGroup } from "react-icons/all";

type TableGroup = "center" | "left" | "right"

function getTableHeaderGroups<T extends RowData>(
	table: Table<T>,
	tg?: TableGroup
): [HeaderGroup<T>[], HeaderGroup<T>[]] {
	if (tg === "left") {
		return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()];
	}
	
	if (tg === "right") {
		return [table.getRightHeaderGroups(), table.getRightFooterGroups()];
	}
	
	if (tg === "center") {
		return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()];
	}
	
	return [table.getHeaderGroups(), table.getFooterGroups()];
}

function getRowGroup<T extends RowData>(row: Row<T>, tg?: TableGroup) {
	if (tg === "left") return row.getLeftVisibleCells();
	if (tg === "right") return row.getRightVisibleCells();
	if (tg === "center") return row.getCenterVisibleCells();
	return row.getVisibleCells();
}

type Props<T extends RowData> = {
	table: Table<T>
	tableGroup?: TableGroup
	canResizeColumn?: boolean
	canMoveColumn?: boolean
	canPinColumn?: boolean
	canGroupColumn?: boolean,
	sortable?: boolean
	canColumnFilter?: boolean
	disableAutocomplete: boolean
	className: string,
}

export function CustomTable<T extends RowData>({
												   table,
												   tableGroup,
												   canResizeColumn,
												   canMoveColumn,
												   canPinColumn,
												   sortable = true,
												   canGroupColumn,
												   canColumnFilter = true,
												   className,
												   disableAutocomplete,
											   }: Props<T>) {
	const [headerGroups] = getTableHeaderGroups(table, tableGroup);

	return (
		<table className={`w-full whitespace-nowrap ${className}`}>
			<thead>
			{headerGroups.map(headerGroup => (
				<tr key={headerGroup.id} className="bg-gray-100">
					{headerGroup.headers.map(header => (
						<th
							className="bg-gray-100 sticky top-0 py-2 px-1 font-semibold whitespace-nowrap align-top"
							key={header.id}
							style={{
								width: header.getSize()
							}}
							colSpan={header.colSpan}
						>
							{header.isPlaceholder ? null : (
								<>
									<div className=" flex justify-between w-full pr-2 pb-1 border-b-2 mb-1">
										{canGroupColumn && header.column.getCanGroup() ? (
											// If the header can be grouped, let's add a toggle
											<button
												onClick={header.column.getToggleGroupingHandler()}
												style={{
													cursor: "pointer"
												}}
											>
												{header.column.getIsGrouped()
													? <AiOutlineGroup className="h-4 w-4" title="Group by" />
													: <AiOutlineUngroup className="h-4 w-4" title="Ungroup by" />}
											</button>
										) : null}{" "}
										<span className="text-sm">
                                            {flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}{" "}
                                       </span>
										{sortable && (
											<button
												onClick={header.column.getToggleSortingHandler()}
												className={
													header.column.getCanSort()
														? "cursor-pointer select-none"
														: ""
												}
											>
												{{
													asc: <FaSortUp className="h-4 w-4 text-gray-700" />,
													desc: <FaSortDown className="h-4 w-4 text-gray-700" />
												}[header.column.getIsSorted() as string] ?? (header.column.getCanSort() ?
													<FaSort className="h-4 w-4 text-gray-300" /> : null)}
											</button>
										)}
									</div>
									{canColumnFilter && header.column.getCanFilter() ? (
										<div>
											<Filter column={header.column} table={table} disableAutocomplete={disableAutocomplete} />
										</div>
									) : null}
								</>
							)}
							{canResizeColumn && (
								<div
									className="absolute right-0 top-0 h-full w-1 bg-blue-300 select-none touch-none hover:bg-blue-500 cursor-col-resize"
									onMouseDown={header.getResizeHandler()}
									onTouchStart={header.getResizeHandler()}
								/>
							)}
							{canMoveColumn && !header.isPlaceholder && header.column.getCanPin() && (
								<TablePins
									isPinned={header.column.getIsPinned()}
									pin={header.column.pin}
								/>
							)}
						</th>
					))}
				</tr>
			))}
			</thead>
			<tbody>
			{table.getRowModel().rows.map(row => (
				<tr key={row.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
					{getRowGroup(row, tableGroup).map(cell => (
						<td
							className="p-1 text-sm"
							key={cell.id}
							style={{
								width: cell.column.getSize()
							}}
						>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</td>
					))}
				</tr>
			))}
			{table.getRowModel().rows && table.getRowModel().rows.length === 0 && (
				<tr><td colSpan={table.getAllColumns().length} className="text-center">No Records</td></tr>
			)}
			</tbody>
		</table>
	);
}

export default CustomTable;
