import { QueryObserver, notifyManager } from 'react-query';

export class Listener {
	constructor(queryClient) {
		this.queryClient = queryClient;
		this.observers = {};
		this.prevResults = {};
	}

	listen(queryKey, queryFn, cb) {
    // if using the API again before unsubscribing (usually same page)
		if (this.observers[queryKey]) {
      this.observers[queryKey].observer.refetch();
			cb(this.observers[queryKey].observer.getCurrentResult()?.data);
			return this.observers[queryKey].remove;
    }
    // creating a new observer based on an existing cache, usually when navigating to a new page
		const observer = new QueryObserver(this.queryClient, {
			queryKey,
			queryFn,
		});
		const unsubscribe = observer.subscribe(
			notifyManager.batchCalls((r) => {
				if (r?.dataUpdatedAt !== this.prevResults[queryKey]?.dataUpdatedAt) {
					this.prevResults[queryKey] = r;
					cb(r.data);
				}
			})
    );
    cb(observer.getCurrentResult()?.data);

		const remove = () => {
			unsubscribe();
			delete this.observers[queryKey];
		};

		this.observers[queryKey] = { observer, remove };
		return remove;
	}
}
