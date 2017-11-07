import * as stream from 'stream';

export default class TransformBatch<I, O> extends stream.Transform {

	private batch: I[];

	constructor(
		private batchSize: number,
		private transformFunc: (m: I) => O[],
	) {
		super({objectMode: true});
		this.batch = [];
	}

	public async _transform(input: I, enc: any, cb: () => void) {
		this.batch.push(input);
		if (this.batch.length >= this.batchSize) {
			await this.processBatch();
		}
		cb();
	}

	private async processBatch() {
		for (const i of this.batch) {
			try {
				(await this.transformFunc(i)).forEach((o) => this.push(o));
			} catch (err) {
				this.emit('error', err);

				throw err;
			}
		}
		this.batch = [];
	}
}
