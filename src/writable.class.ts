import * as stream from 'stream';

export class Writable extends stream.Writable {

	public finished: Promise<void>;
	public closed: Promise<void>;

	constructor(opts?: stream.WritableOptions) {
		super(Object.assign(opts, {objectMode: true}));
		this.finished = new Promise((rs, rj) => {
			this.on('finished', rs);
			this.on('error', rj);
		});
		this.closed = new Promise((rs, rj) => {
			this.on('closed', rs);
			this.on('error', rj);
		});
	}
}
