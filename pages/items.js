import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { QueryClient, QueryObserver, notifyManager } from 'react-query';
import axios from 'axios';
import { API } from '../api';

class Items extends React.Component {
	state = {
		items: [],
		items2: []
	};

	async componentDidMount() {
		this.unsub = await API.getItems((items) => {
			console.log('received items', items);
			this.setState({ items })
		});
		// this.setState({items2: await API.getItems()})
	}

	componentWillUnmount() {
		this.unsub();
	}

	render() {
		return (
			<div>
				<div>Items</div>
				<div>{JSON.stringify(this.state.items)}</div>
				<hr/>
				{/* <div>{JSON.stringify(this.state.items2)}</div> */}
				<Link href="/">
					<a>Home</a>
				</Link>
			</div>
		);
	}
}

export default Items;
