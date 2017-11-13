import {Transform} from './transform.class';

export function asyncFilter(check: (input: any) => Promise<boolean>) {
	return new Transform({
		async transform(item: any, enc: any, cb: () => void) {
			try {
				if (await check(item)) { this.push(item); }
			} catch (err) {
				this.destroy(err);
			}
			cb();
		},
	});
}
