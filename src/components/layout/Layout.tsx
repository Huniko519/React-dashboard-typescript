import React from 'react'

import './layout.scss'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route } from 'react-router-dom'
import useStore from '../../useStore'

const Layout = () => {
	const G = useStore()
	return (
		<BrowserRouter>
			<Route render={(props) => (
				<div className={`layout ${G.mode} ${G.color}`}>
					<Sidebar {...props}/>
					<div className="content">
						<TopNav/>
						<div className="main">
							<Routes/>
						</div>
					</div>
				</div>
			)}/>
		</BrowserRouter>
	)
}

export default Layout
