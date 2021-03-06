var $7pP8V$actionscore = require("@actions/core");
var $7pP8V$actionsgithub = require("@actions/github");
var $7pP8V$fs = require("fs");
var $7pP8V$path = require("path");
var $7pP8V$child_process = require("child_process");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $2555de85c75805d7$export$d239e0366fca934e = ()=>{
    const pr = $7pP8V$actionsgithub.context.payload.pull_request;
    if (!pr) return false;
    return pr.head.repo.full_name !== pr.base.repo.full_name;
};


const $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3 = (name, defaultValue)=>{
    return process.env[name] || defaultValue;
};


const $9271d6a0769c8383$export$42405f212471e8a2 = (name, defaultValue = false)=>{
    const env = process.env[name];
    return env === "true" || env !== "false" && defaultValue;
};


const $4e883dec39b0a1c0$export$a04746c34337686a = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_TAG-PREFIX", "");
const $4e883dec39b0a1c0$export$eceeda9df681e8de = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_COMMIT-MESSAGE", "ci: version bump to {{version}}");
const $4e883dec39b0a1c0$export$4fa4a22200055c8a = new RegExp($4e883dec39b0a1c0$export$eceeda9df681e8de.replace(/{{version}}/g, `${$4e883dec39b0a1c0$export$a04746c34337686a}\\d+\\.\\d+\\.\\d+`), "ig");
const $4e883dec39b0a1c0$export$9c22c0b0c1bcc7b5 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_MAJOR-WORDING", "BREAKING CHANGES").split(",");
const $4e883dec39b0a1c0$export$945cdec32488ff3d = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_MINOR-WORDING", "feat").split(",");
const $4e883dec39b0a1c0$export$7c6e2bf360dbbe96 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_PATCH-WORDING", "fix").split(",");
const $4e883dec39b0a1c0$export$cdee35690a0285d2 = $9271d6a0769c8383$export$42405f212471e8a2("INPUT_SKIP-COMMIT");
const $4e883dec39b0a1c0$export$d2d4258b08d61040 = $9271d6a0769c8383$export$42405f212471e8a2("INPUT_SKIP-TAG");
const $4e883dec39b0a1c0$export$a876fbbd4947e142 = $9271d6a0769c8383$export$42405f212471e8a2("INPUT_SKIP-PUSH");
const $4e883dec39b0a1c0$export$21e47e591597ba47 = $9271d6a0769c8383$export$42405f212471e8a2("INPUT_SKIP-FOR-CANARY");
const $4e883dec39b0a1c0$export$3afee1e46ea25b40 = $9271d6a0769c8383$export$42405f212471e8a2("INPUT_ABORT-FOR-FORKS");


const $eeb57b34270821dd$export$7614f1c7608a9f16 = (commits)=>{
    return commits.map((commit)=>commit.message
    );
};


const $e3f708878f039a98$export$ad60db2a67d9e517 = async (commits)=>{
    const messages = $eeb57b34270821dd$export$7614f1c7608a9f16(commits);
    return messages.some((message)=>$4e883dec39b0a1c0$export$4fa4a22200055c8a.test(message)
    );
};






var ref;
const $25f6fd31a701b1af$export$db8bb791c0a06140 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GITHUB_EVENT_PATH");
const $25f6fd31a701b1af$export$da7dc787b5bb24a3 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GITHUB_WORKSPACE");
const $25f6fd31a701b1af$export$8237651927eeefcf = Boolean($58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GITHUB_HEAD_REF"));
const $25f6fd31a701b1af$export$7a8ad8ca56c1ff93 = (ref = $7pP8V$actionsgithub.context.payload.pull_request) === null || ref === void 0 ? void 0 : ref.number;
const $25f6fd31a701b1af$export$419e033c3ff0b48f = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GITHUB_REPOSITORY");
const $25f6fd31a701b1af$export$b2c618602f6acb32 = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${$25f6fd31a701b1af$export$419e033c3ff0b48f}.git`;
const $25f6fd31a701b1af$export$ff09b90989b21a8 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GUTHUB_USER", "Automated Version Bump");
const $25f6fd31a701b1af$export$61171c632678b12e = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GUTHUB_EMAIL", "bump-package-version-action@users.noreply.github.com");


const $d00624c5e0395f8d$var$fsExists = async (filePath)=>$7pP8V$fs.promises.access(filePath, $7pP8V$fs.constants.F_OK).then(()=>true
    , ()=>false
    )
;
const $d00624c5e0395f8d$export$58452b1f896d18ce = async ()=>{
    const pathToPackage = ($parcel$interopDefault($7pP8V$path)).join($25f6fd31a701b1af$export$da7dc787b5bb24a3, "package.json");
    if (!await $d00624c5e0395f8d$var$fsExists(pathToPackage)) throw new Error("package.json could not be found in your project's root");
    return require(pathToPackage);
};




const $d56d63f6fcd207e2$export$9a4ff46b96c101f8 = (messages, words)=>{
    return messages.some((message)=>words.some((word)=>message.startsWith(word)
        )
    );
};


const $0bd15d6309841405$export$d6875ac9e42c5d13 = (commits)=>{
    const messages = $eeb57b34270821dd$export$7614f1c7608a9f16(commits);
    switch(true){
        case $d56d63f6fcd207e2$export$9a4ff46b96c101f8(messages, $4e883dec39b0a1c0$export$9c22c0b0c1bcc7b5):
            return "major";
        case $d56d63f6fcd207e2$export$9a4ff46b96c101f8(messages, $4e883dec39b0a1c0$export$945cdec32488ff3d):
            return "minor";
        case $d56d63f6fcd207e2$export$9a4ff46b96c101f8(messages, $4e883dec39b0a1c0$export$7c6e2bf360dbbe96):
            return "patch";
        default:
            return null;
    }
};




const $614da927c656e026$export$c76cbc8af6040a47 = async ()=>{
    const eventCommits = $25f6fd31a701b1af$export$db8bb791c0a06140 && (await require($25f6fd31a701b1af$export$db8bb791c0a06140)).commits;
    if (!$25f6fd31a701b1af$export$8237651927eeefcf) return eventCommits || [];
    const { data: data  } = await $7pP8V$actionsgithub.getOctokit(process.env.GITHUB_TOKEN).rest.pulls.listCommits({
        repo: $25f6fd31a701b1af$export$419e033c3ff0b48f.split("/")[1],
        owner: process.env.GITHUB_REPOSITORY_OWNER,
        // pretty sure it's a pull request
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pull_number: $25f6fd31a701b1af$export$7a8ad8ca56c1ff93
    });
    return data.map(({ commit: commit  })=>commit
    );
};





const $df40e2c226cd3ec7$export$78e3044358792147 = (command)=>{
    return new Promise((resolve, reject)=>{
        $7pP8V$child_process.exec(command, {
            cwd: $25f6fd31a701b1af$export$da7dc787b5bb24a3
        }, (err, stdout, stderr)=>{
            if (!err) resolve(stdout);
            reject(`${stderr}\n${command} exited with error ${err}`);
        });
    });
};


const $dd39407a6c55c725$export$f3912e27b190ed8d = async ()=>{
    await $df40e2c226cd3ec7$export$78e3044358792147(`git config user.name "${$25f6fd31a701b1af$export$ff09b90989b21a8}"`);
    await $df40e2c226cd3ec7$export$78e3044358792147(`git config user.email "${$25f6fd31a701b1af$export$61171c632678b12e}"`);
};



const $51a6b55ebdaad9e7$export$66495e3f9280fd95 = ()=>{
    if ($25f6fd31a701b1af$export$8237651927eeefcf) return process.env.GITHUB_HEAD_REF;
    return /refs\/[a-zA-Z]+\/(.*)/.exec(process.env.GITHUB_REF)[1];
};



const $65ddd2448ff13334$export$ccc883122007ba34 = async ()=>{
    const branch = $51a6b55ebdaad9e7$export$66495e3f9280fd95();
    await $df40e2c226cd3ec7$export$78e3044358792147(`git checkout ${branch}`);
};



const $e6ab11aad6f9a168$export$f3f986eb423a3343 = async (version)=>{
    const latestHash = await $df40e2c226cd3ec7$export$78e3044358792147("git rev-parse --short HEAD");
    return version.replace(/-canary-.*/, "") + `-canary-${latestHash}`;
};




const $f889754ddad8110b$export$52f84dc7de3cd4b8 = async (type)=>{
    const version = (await $df40e2c226cd3ec7$export$78e3044358792147(`npm version --git-tag-version=false ${type}`)).trim();
    if (!$25f6fd31a701b1af$export$8237651927eeefcf) return version;
    const canaryVersion = await $e6ab11aad6f9a168$export$f3f986eb423a3343(version);
    return await $df40e2c226cd3ec7$export$78e3044358792147(`npm version --git-tag-version=false ${canaryVersion}`);
};




const $d688e08773f8faf9$export$3c0b7c85670b6d1a = async (version)=>{
    const commitMessage = $4e883dec39b0a1c0$export$eceeda9df681e8de.replace(/{{version}}/g, version);
    await $df40e2c226cd3ec7$export$78e3044358792147(`git commit -a -m "${commitMessage}"`);
};




const $4551542afe13c472$export$3ffcc9a890cc5e87 = async ()=>{
    await $df40e2c226cd3ec7$export$78e3044358792147(`git push ${$25f6fd31a701b1af$export$b2c618602f6acb32}`);
    await $df40e2c226cd3ec7$export$78e3044358792147(`git push ${$25f6fd31a701b1af$export$b2c618602f6acb32} --tags`);
};



const $3d4be95bac04087b$export$683f9f4843c07b19 = async (version)=>{
    await $df40e2c226cd3ec7$export$78e3044358792147(`git tag ${version}`);
};




const $51bb0293d98c833a$export$35ff605ec30dcd48 = async ()=>{
    if ($4e883dec39b0a1c0$export$3afee1e46ea25b40 && $2555de85c75805d7$export$d239e0366fca934e()) {
        console.log("Running in a PR from a fork: aborting bump");
        $7pP8V$actionscore.setOutput("version", null);
        return;
    }
    const commits = await $614da927c656e026$export$c76cbc8af6040a47();
    if (commits.length === 0) {
        console.log("No commits found: aborting bump");
        $7pP8V$actionscore.setOutput("version", null);
        return;
    }
    if (await $e3f708878f039a98$export$ad60db2a67d9e517(commits)) {
        console.log("Previous bump found: aborting bump");
        $7pP8V$actionscore.setOutput("version", null);
        return;
    }
    await $dd39407a6c55c725$export$f3912e27b190ed8d();
    const bumpType = $0bd15d6309841405$export$d6875ac9e42c5d13(commits);
    if (bumpType === null) {
        console.log("No wording matched: aborting bump");
        $7pP8V$actionscore.setOutput("version", null);
        return;
    }
    await $65ddd2448ff13334$export$ccc883122007ba34();
    const pkg = await $d00624c5e0395f8d$export$58452b1f896d18ce();
    const current = pkg.version.toString();
    const version = await $f889754ddad8110b$export$52f84dc7de3cd4b8(bumpType);
    if (!$25f6fd31a701b1af$export$8237651927eeefcf || $25f6fd31a701b1af$export$8237651927eeefcf && !$4e883dec39b0a1c0$export$21e47e591597ba47) {
        !$4e883dec39b0a1c0$export$cdee35690a0285d2 && await $d688e08773f8faf9$export$3c0b7c85670b6d1a(version);
        !$4e883dec39b0a1c0$export$d2d4258b08d61040 && await $3d4be95bac04087b$export$683f9f4843c07b19(version);
        !$4e883dec39b0a1c0$export$a876fbbd4947e142 && await $4551542afe13c472$export$3ffcc9a890cc5e87();
    }
    console.log(`Successfully bumped version from ${current} to ${version}`);
    $7pP8V$actionscore.setOutput("version", version);
};


$51bb0293d98c833a$export$35ff605ec30dcd48();
process.on("unhandledRejection", (reason, promise)=>{
    console.error(`Error: ${reason} - ${promise}`);
    process.exit(1);
});


