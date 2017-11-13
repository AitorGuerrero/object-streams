import {Transform} from './transform.class';

export function asyncForEach(functionToApply: (item: any) => Promise<any>) {
	return new Transform({
		async transform(item: any, enc: any, cb: () => any) {
			try {
				await functionToApply(item);
			} catch (err) {
				this.destroy(err);
			}
			this.push(item);
			cb();
		},
	});
}
