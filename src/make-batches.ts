import {Transform} from './transform.class';

export function makeBatches(length: number) {
	let batch: any[] = [];

	return new Transform({
		transform(item: any, enc: any, cb: () => any) {
			batch.push(item);
			if (batch.length >= length) {
				this.push(batch);
				batch = [];
			}
			cb();
		},
		flush(cb: () => void) {
			if (batch.length > 0) {
				this.push(batch);
			}
			cb();
		},
	});
}
