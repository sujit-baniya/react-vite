
import { Fragment, useState } from 'react'
import { extract } from '~/core/helpers/react-helper'
import {BsDownload, BsTrash, BsClipboard, FiSettings, FaSortDown, FaSortUp, FaSort} from "react-icons/all";

export const RTr = ({ children, scope }) => {
	const { Th, Td } = extract({
		Th: RTh,
		Td: RTd,
	}).from(children)
	const rowClasses = (Td.length > 0 ? 'hover:bg-white' : '')
	return (
		<Fragment>
			<tr className={`transition-all odd:bg-gray-50 even:bg-gray-100 ${rowClasses}`}>
				{Th}
				{Td}
			</tr>
		</Fragment>
	)
}

export const RThead = (props) => {
	return (
		<Fragment>
			<thead>
				{props.children}
			</thead>
		</Fragment>
	)
}

export const RTbody = (props) => {
	return (
		<Fragment>
			<tbody>
				{props.children}
			</tbody>
		</Fragment>
	)
}

export const RTh = ({ children, scope, sortBy, className, template }) => {
	const [field, setField] = useState('')
	const [direction, setDirection] = useState('normal')
	className = className ? className : 'text-xs font-medium uppercase'
	className = 'px-2 py-2 select-none cursor-pointer tracking-wider text-left bg-white whitespace-nowrap ' + (template ? '' : className)
	const changeOrder = () => {
		if (direction === 'asc') {
			setDirection('desc')
		} else if (direction === 'desc') {
			setDirection('normal')
		} else {
			setDirection('asc')
		}
	}
	return (
		<Fragment>
			<th
				className={className}
				onClick={changeOrder}
			>
				<span className="flex block w-full align-center items-center space-x-2 gap-1">
					{children}
					{direction === 'asc' && <FaSortDown className="w-4 h-4"/>}
					{direction === 'desc' && <FaSortUp className="w-4 h-4"/>}
					{direction === 'normal' && <FaSort className="w-4 h-4 text-gray-300"/>}
				</span>
			</th>
		</Fragment>
	)
}

export const RTd = ({ children, className, template }) => {
	className = className ? className : 'whitespace-nowrap align-top'
	className = 'px-2 py-1 ' + (template ? 'tracking-wider whitespace-nowrap' : className)
	return (
		<Fragment>
			<td className={className}>
				{children}
			</td>
		</Fragment>
	)
}

export const TableTitle = ({ title }) => {
	return (
		<h1 className="text-2xl font-semibold whitespace-nowrap pl-2 pt-2">
			{{ title }}
		</h1>
	)
}

export const Download = ({ rows, title }) => {
	return <h1>Download</h1>
}

export const TableButtons = ({ buttons, rows, title }) => {
	return (
		<div className="flex items-center">
			<ul className="flex flex-row space-x-1 pr-2" v-if="tableRows">
				<li>
					<button
						type="button"
						className="m-1 p-1 flex justify-center items-center bg-gray-200 text-gray-500 hover:bg-gray-300 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow focus:outline-none focus:ring-0 focus:ring-offset-2 rounded"
					>
						<Download rows={rows} fileName={title}>
							<BsDownload className="h-4 w-4 cursor-pointer mt-1" />
						</Download>
					</button>
				</li>
			</ul>
			<ul className="flex flex-row space-x-1">
				<li>
					<button
						type="button"
						className="mr-1 py-2 px-2 flex justify-center items-center bg-gray-200 text-gray-500 hover:text-white hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
					>
						<BsTrash className="h-4 w-4" />
					</button>
				</li>
				<li>
					<button
						type="button"
						className="mr-1 py-2 px-2 flex justify-center items-center bg-gray-200 text-gray-500 hover:text-white hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
					>
						<BsClipboard className="h-4 w-4" />
					</button>
				</li>
				<li>
					<button
						type="button"
						className="mr-1 py-2 px-2 flex justify-center items-center bg-gray-200 text-gray-500 hover:text-white hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
					>
						<FiSettings className="h-4 w-4" />
					</button>
				</li>
			</ul>
			{buttons}
		</div>
	)
}

export const TableFilters = ({ filters }) => {
	return (
		<div className="flex items-center overflow-x-auto whitespace-nowrap">
			{filters}
		</div>
	)
}

export const RTemplate = (props) => {
	return (<Fragment>{props.children}</Fragment>)
}

export const RHeadTemplate = (props) => {
	return (<Fragment>{props.children}</Fragment>)
}

export const TableActions = ({ children, rows, title }) => {
	const { buttons, filters } = extract({
		buttons: TableButtons,
		filters: TableFilters,
	}).from(children)
	return (
		<section className="flex justify-between px-2 py-3 mb-2 text-gray-700 font-montserrat text-sm">
			{buttons}
			{filters}
		</section>
	)
}

export const RTable = (props) => {
	const { Thead, Tbody, Template, HeadTemplate } = extract({
		Thead: RThead,
		Tbody: RTbody,
		Template: RTemplate,
		HeadTemplate: RHeadTemplate
	}).from(props.children)
	const rows = props.rows || []
	const columns = props.columns || []
	return (
		<div>
			<div className="grid grid-cols-1 overflow-x-auto whitespace-nowrap p-2 slim-scrollbar">
				<table className="px-5 py-2 w-full divide-y divide-gray-200 bg-gray-50 text-sm table">
					{columns.length === 0 && Thead}
					{
						columns.length > 0 && (
							<RThead>
								<RTr>
								{
									columns.map(column => {
										let tmplFound = false
										let tmpl = HeadTemplate.map((tmpl, i) => {
											if (column.field === tmpl.props.field && tmpl.props.template) {
												tmplFound = true
												return (
													<RTh key={column.field} template={true}>
														{tmpl.props.template(column)}
													</RTh>
												)
											}
										})
										if (!tmplFound) {
											return (<RTh key={column.field}>{column.title}</RTh>)
										} else {
											return tmpl
										}
									})
								}
								</RTr>
							</RThead>
						)
					}
					{rows.length === 0 && Tbody}
					{
						rows.length > 0 && (
							<RTbody>
								{
									rows.map((row, i) => {
										return (
											<RTr key={i}>
												{
													columns.length > 0 && (
														columns.map((column, j) => {
															if (row[column.field]) {
																let tmplFound = false
																let tmpl = Template.map((tmpl, i) => {
																	if (column.field === tmpl.props.field && tmpl.props.template) {
																		tmplFound = true
																		return (
																			<RTd key={j} template={true}>
																				{tmpl.props.template(row)}
																			</RTd>
																		)
																	}
																})
																if (!tmplFound) {
																	return (<RTd key={j}>{row[column.field]}</RTd>)
																} else {
																	return tmpl
																}
															}
														})
													)
												}
												{
													columns.length === 0 && (
														Object.keys(row).map((key, index) => {
															let tmplFound = false
															let tmpl = Template.map((tmpl, i) => {
																if (key === tmpl.props.field && tmpl.props.template) {
																	tmplFound = true
																	return (
																		<RTd key={key} template={true}>
																			{tmpl.props.template(row)}
																		</RTd>
																	)
																}
															})
															if (!tmplFound) {
																return (<RTd key={key}>{row[key]}</RTd>)
															} else {
																return tmpl
															}
														})
													)
												}
											</RTr>
										)
									})
								}
							</RTbody>
						)
					}
				</table>
			</div>
		</div>
	)
}
