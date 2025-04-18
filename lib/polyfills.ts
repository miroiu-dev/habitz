if (typeof AbortSignal.any !== 'function') {
	AbortSignal.any = function any(signals: AbortSignal[]): AbortSignal {
		const controller = new AbortController();

		function onAbort() {
			controller.abort();
			for (const signal of signals) {
				signal.removeEventListener('abort', onAbort);
			}
		}

		for (const signal of signals) {
			if (signal.aborted) {
				onAbort();
				break;
			}
			signal.addEventListener('abort', onAbort);
		}

		return controller.signal;
	};
}
