import React, {useState} from 'react'

import './table.scss'

const Table = (props) => {

	const initDataShow = props.limit && props.bodyData ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData

	const [dataShow, setDataShow] = useState(initDataShow)

	let pages = 1

	let range = [] as number[]

	if (props.limit !== undefined) {
		let page = Math.floor(props.bodyData.length / Number(props.limit))
		pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1
		/* range = [...Array(pages).keys()] */
		for(let i=0; i<pages; i++) range.push(i)
	}

	const [currPage, setCurrPage] = useState(0)

	const selectPage = page => {
		const start = Number(props.limit) * page
		const end = start + Number(props.limit)

		setDataShow(props.bodyData.slice(start, end))

		setCurrPage(page)
	}

	return (
		<div>
			<div className="table-wrapper">
				<table>
					{ props.headData && props.renderHead ? (
						<thead>
							<tr>{ props.headData.map((item, index) => props.renderHead(item, index)) } </tr>
						</thead>
					) : null }
					{ props.bodyData && props.renderBody ? (
						<tbody>{ dataShow.map((item, index) => props.renderBody(item, index)) } </tbody>
					) : null }
				</table>
			</div>
			{ pages > 1 ? (
				<div className="pagination">
					{ range.map((index) => (
						<div key={index} className={`item ${currPage === index ? 'active' : ''}`} onClick={() => selectPage(index)}>
							{index + 1}
						</div>
					)) }
				</div>
			) : null}
		</div>
	)
}

export default Table
