import axios from 'axios';
import { Listener } from './listener';
import { queryClient } from './queryClient';

const listener = new Listener(queryClient);

export const API = {
	getItems: wrapInReactQuery('items', async () => {
		return (await axios.get('/api/items')).data.data;
	}),
	getCounter: wrapInReactQuery('counter', async () => {
		return (await axios.get('/api/counter')).data.data;
	}),
};

function wrapInReactQuery(namespace, object) {
	const handler = {
		apply(target, thisArg, args) {
			const cb = args[args.length - 1];
			if (typeof cb === 'function') {
				const restOfArgs = args.slice(0, -1);
				return listener.listen(namespace, () => target.apply(thisArg, restOfArgs), cb);
			} else {
				return target.apply(thisArg, args);
			}
		},
	};
	return new Proxy(object, handler);
}
