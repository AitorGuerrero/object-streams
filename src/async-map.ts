import {Transform} from './transform.class';

export function asyncMap(transformFunc: (input: any) => Promise<any>) {
	return new Transform({
		async transform(item: any, enc: any, cb: () => void) {
			try {
				this.push(await transformFunc(item));
			} catch (err) {
				this.destroy(err);
			}
			cb();
		},
	});
}
