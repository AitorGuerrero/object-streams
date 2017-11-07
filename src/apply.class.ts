import * as stream from 'stream';

export default class Apply extends stream.Transform {
	constructor(private functionToApply: (item: any) => any) {
		super({objectMode: true});
	}

	public async _write(item: any, enc: any, cb: () => any) {
		try {
			await this.functionToApply(item);
		} catch (err) {
			this.emit('error', err);
		}
		this.push(item);
		cb();
	}
}
