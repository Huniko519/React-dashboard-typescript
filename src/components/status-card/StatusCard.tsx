import React from 'react'

import './statuscard.scss'

const StatusCard = (props) => {
	return (
		<div className='status-card'>
			<div className="icon">
				<i className={props.icon}></i>
			</div>
			<div className="info">
				<h4>{props.count}</h4>
				<span>{props.title}</span>
			</div>
		</div>
	)
}

export default StatusCard
