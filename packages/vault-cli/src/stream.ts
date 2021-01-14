import { Writable } from "stream";

type MuteStreamState = {
  isMuted: boolean;
};

export class MuteStream extends Writable {
  ws: NodeJS.WriteStream = process.stdout;

  state: MuteStreamState = {
    isMuted: false,
  };

  constructor() {
    super();
  }

  mute() {
    this.state.isMuted = true;
  }
  unmute() {
    this.state.isMuted = false;
  }

  _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    if (this.state.isMuted) {
      return callback();
    }
    this.ws.write(chunk, encoding, callback);
  }

  _writev?(
    chunks: Array<{ chunk: any; encoding: BufferEncoding }>,
    callback: (error?: Error | null) => void
  ): void {
    let count = 0;
    for (let i = 0; i < chunks.length; i++) {
      if (this.state.isMuted) {
        callback();
      } else {
        this.ws.write(chunks[i].chunk, chunks[i].encoding, (e) => {
          if (e) return callback(e);
          if (++count === chunks.length) return callback(null);
        });
      }
    }
  }

  _final(callback: (error?: Error | null) => void): void {
    callback();
  }
}
