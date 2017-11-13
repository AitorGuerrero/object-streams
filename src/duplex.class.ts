import * as stream from 'stream';

export class Duplex extends stream.Duplex {

	public ended: Promise<void>;
	public finished: Promise<void>;
	public closed: Promise<void>;

	constructor(opts?: stream.DuplexOptions) {
		super(Object.assign(opts, {objectMode: true}));
		this.ended = new Promise((rs, rj) => {
			this.on('end', rs);
			this.on('error', rj);
		});
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
