import React from 'react';
import Link from 'next/link';
import { API } from '../api';

class Home extends React.Component {

  state = {
    counter: -1
  }

  async componentDidMount() {
    this.setState({counter: await API.getCounter()})
  }


	render() {
		return (
			<div>
				<div>Zoop</div>
        <div>{this.state.counter}</div>
        <Link href="/items"><a>Go to Items</a></Link>
			</div>
		);
	}
}

export default Home;

