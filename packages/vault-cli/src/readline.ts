import readline from "readline";
import { MuteStream } from "./stream";

const stdout = process.stdout;

type Question = {
  type: string;
  name: string;
  message: string;
  transform?: (v: string) => string;
};

class Line {
  rl: readline.Interface;
  constructor(input: NodeJS.ReadableStream, output: NodeJS.WritableStream) {
    this.rl = readline.createInterface({
      terminal: true,
      input,
      output,
    });
  }

  line(): Promise<string> {
    const rl = this.rl;
    return new Promise((resolve) => {
      function handleLine(l: string) {
        rl.removeListener("line", handleLine);
        resolve(l);
      }
      rl.addListener("line", handleLine);
    });
  }
}

// https://github.com/lukeed/kleur/blob/master/index.mjs
function gray(i: string) {
  return "\x1b[90m" + i + "\x1b[39m";
}

function red(i: string) {
  return "\x1b[31m" + i + "\x1b[39m";
}

export class RLError extends Error {
  // public readonly code: number;

  constructor(msg: string) {
    super(msg);
    Error.captureStackTrace(this, RLError);
  }
}

export async function create(
  questions: Question[]
): Promise<Record<string, string>> {
  const output = new MuteStream();

  const l = new Line(process.stdin, output);

  const answers: Record<string, string> = {};

  for (let i = 0; i < questions.length; i++) {
    const cleanups = [];

    // ask the question
    const q = questions[i];
    stdout.write(q.message + " ");

    if (q.type === "password") {
      stdout.write(gray("(input is hidden)") + " ");
      output.mute();
      cleanups.push(() => output.unmute());
      // we need to produce the new line manually
      // since output was muted before
      cleanups.push(() => stdout.write("\n"));
    }

    const x0 = await l.line();
    if (q.transform) {
      try {
        answers[q.name] = q.transform(x0);
      } catch (e) {
        if (e instanceof RLError) {
          // let's re-ask the question
          i--;
          cleanups.forEach((f) => f());
          stdout.write(red(e.message));
          continue;
        }
        throw e;
      }
    } else {
      answers[q.name] = x0;
    }

    // cleanups
    cleanups.forEach((f) => f());
  }

  l.rl.close();
  return answers;
}

// TODO add validate+filter or transform feature

// const questions = [
//   { type: "input", name: "n0", message: "What about n0?" },
//   { type: "password", name: "n1", message: "What about n1?" },
//   { type: "input", name: "n2", message: "What about n2?" },
// ];

// create(questions);
