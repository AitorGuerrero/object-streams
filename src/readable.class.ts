import * as stream from 'stream';

export class Readable extends stream.Readable {

	public ended: Promise<any>;
	public closed: Promise<any>;

	constructor(opts?: stream.ReadableOptions) {
		super(Object.assign(opts, {objectMode: true}));
		this.ended = new Promise((rs, rj) => {
			this.on('end', rs);
			this.on('error', rj);
		});
		this.closed = new Promise((rs, rj) => {
			this.on('closed', rs);
			this.on('error', rj);
		});
	}
}
