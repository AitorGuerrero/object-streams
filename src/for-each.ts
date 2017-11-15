import {Transform} from './transform.class';

export function forEach(functionToApply: (item: any) => any) {
	return new Transform({
		transform(item: any, enc: any, cb: () => any) {
			try {
				functionToApply(item);
			} catch (err) {
				this.emit('error', err);
			}
			this.push(item);
			cb();
		},
	});
}
