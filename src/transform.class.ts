import * as stream from 'stream';

export class Transform extends stream.Transform {
	constructor(
		private transformFunc: (m: any) => any,
	) {
		super({objectMode: true});
	}
	public async _transform(item: any, enc: any, cb: () => any) {
		try {
			this.push(await this.transformFunc(item));
		} catch (err) {
			this.emit('error', err);
		}
		cb();
	}
}
