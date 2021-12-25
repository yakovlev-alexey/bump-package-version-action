import { exec as nodeExec } from "child_process";

import { WORKSPACE } from "../constants";

const exec = (command: string) => {
    return new Promise<string>((resolve, reject) => {
        nodeExec(command, { cwd: WORKSPACE }, (err, stdout, stderr) => {
            if (!err) {
                resolve(stdout);
            }

            reject(`${stderr}\n${command} exited with error ${err}`);
        });
    });
};

export { exec };
