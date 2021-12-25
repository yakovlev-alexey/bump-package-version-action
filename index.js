var $7pP8V$fs = require("fs");
var $7pP8V$path = require("path");
var $7pP8V$child_process = require("child_process");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
const $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3 = (name, defaultValue)=>{
    var _name;
    return (_name = process.env[name]) !== null && _name !== void 0 ? _name : defaultValue;
};


const $e1181c88df78847e$export$db8bb791c0a06140 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GITHUB_EVENT_PATH");
const $e1181c88df78847e$export$da7dc787b5bb24a3 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GITHUB_WORKSPACE");
const $e1181c88df78847e$export$8237651927eeefcf = Boolean($58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GITHUB_HEAD_REF"));
const $e1181c88df78847e$export$b2c618602f6acb32 = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`;
const $e1181c88df78847e$export$ff09b90989b21a8 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GUTHUB_USER", "Automated Version Bump");
const $e1181c88df78847e$export$61171c632678b12e = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("GUTHUB_EMAIL", "bump-package-version-action@users.noreply.github.com");
const $e1181c88df78847e$export$a04746c34337686a = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_TAG_PREFIX", "");
const $e1181c88df78847e$export$eceeda9df681e8de = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_COMMIT_MESSAGE", "ci: version bump to {{version}}");
const $e1181c88df78847e$export$4fa4a22200055c8a = new RegExp($e1181c88df78847e$export$eceeda9df681e8de.replace(/{{version}}/g, `${$e1181c88df78847e$export$a04746c34337686a}\\d+\\.\\d+\\.\\d+`), "ig");
const $e1181c88df78847e$export$9c22c0b0c1bcc7b5 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_MAJOR_WORDING", "BREAKING CHANGES").split(",");
const $e1181c88df78847e$export$945cdec32488ff3d = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_MINOR_WORDING", "feat").split(",");
const $e1181c88df78847e$export$7c6e2bf360dbbe96 = $58f2a8ee7a8e01f9$export$a7b6bc01c63cdfc3("INPUT_PATCH_WORDING", "fix").split(",");


const $eeb57b34270821dd$export$7614f1c7608a9f16 = (commits)=>{
    return commits.map((commit)=>commit.message
    );
};


const $e3f708878f039a98$export$ad60db2a67d9e517 = async (commits)=>{
    const messages = $eeb57b34270821dd$export$7614f1c7608a9f16(commits);
    return messages.some((message)=>$e1181c88df78847e$export$4fa4a22200055c8a.test(message)
    );
};





const $d00624c5e0395f8d$var$fsExists = async (filePath)=>$7pP8V$fs.promises.access(filePath, $7pP8V$fs.constants.F_OK).then(()=>true
    , ()=>false
    )
;
const $d00624c5e0395f8d$export$58452b1f896d18ce = async ()=>{
    const pathToPackage = ($parcel$interopDefault($7pP8V$path)).join($e1181c88df78847e$export$da7dc787b5bb24a3, "package.json");
    if (!await $d00624c5e0395f8d$var$fsExists(pathToPackage)) throw new Error("package.json could not be found in your project's root");
    return require(pathToPackage);
};



const $614da927c656e026$export$c76cbc8af6040a47 = async ()=>{
    return $e1181c88df78847e$export$db8bb791c0a06140 ? (await require($e1181c88df78847e$export$db8bb791c0a06140)).commits : [];
};


const $6cf48e5bb052e71e$export$675fe7fcc48d1ee8 = (version, commits)=>{
    const latestHash = commits[commits.length - 1].id;
    return version.replace(/-rc-.*/, "") + `-rc-${latestHash}`;
};




const $d56d63f6fcd207e2$export$9a4ff46b96c101f8 = (messages, words)=>{
    return messages.some((message)=>words.some((word)=>message.startsWith(word)
        )
    );
};


const $0bd15d6309841405$export$d6875ac9e42c5d13 = (commits)=>{
    const messages = $eeb57b34270821dd$export$7614f1c7608a9f16(commits);
    switch(true){
        case $d56d63f6fcd207e2$export$9a4ff46b96c101f8(messages, $e1181c88df78847e$export$9c22c0b0c1bcc7b5):
            return "major";
        case $d56d63f6fcd207e2$export$9a4ff46b96c101f8(messages, $e1181c88df78847e$export$945cdec32488ff3d):
            return "minor";
        case $d56d63f6fcd207e2$export$9a4ff46b96c101f8(messages, $e1181c88df78847e$export$7c6e2bf360dbbe96):
            return "patch";
        default:
            return null;
    }
};



const $3e99bd3b79202329$export$c64ae365b10b6f6a = (current, commits)=>{
    if ($e1181c88df78847e$export$8237651927eeefcf) return $6cf48e5bb052e71e$export$675fe7fcc48d1ee8(current, commits);
    else return $0bd15d6309841405$export$d6875ac9e42c5d13(commits);
};





const $df40e2c226cd3ec7$export$78e3044358792147 = (command)=>{
    return new Promise((resolve, reject)=>{
        $7pP8V$child_process.exec(command, {
            cwd: $e1181c88df78847e$export$da7dc787b5bb24a3
        }, (err, stdout, stderr)=>{
            if (!err) resolve(stdout);
            reject(`${stderr}\n${command} exited with code ${err.code}`);
        });
    });
};


const $dd39407a6c55c725$export$f3912e27b190ed8d = async ()=>{
    await $df40e2c226cd3ec7$export$78e3044358792147(`git config user.name "${$e1181c88df78847e$export$ff09b90989b21a8}"`);
    await $df40e2c226cd3ec7$export$78e3044358792147(`git config user.email "${$e1181c88df78847e$export$61171c632678b12e}"`);
};



const $f889754ddad8110b$export$52f84dc7de3cd4b8 = async (version)=>{
    return await $df40e2c226cd3ec7$export$78e3044358792147(`npm version --git-tag-version=false ${version}`);
};




const $d688e08773f8faf9$export$3c0b7c85670b6d1a = async (version)=>{
    const commitMessage = $e1181c88df78847e$export$eceeda9df681e8de.replace(/{{version}}/g, version);
    await $df40e2c226cd3ec7$export$78e3044358792147(`git commit -a -m ${commitMessage}`);
};




const $4551542afe13c472$export$3ffcc9a890cc5e87 = async ()=>{
    await $df40e2c226cd3ec7$export$78e3044358792147(`git push ${$e1181c88df78847e$export$b2c618602f6acb32}`);
    await $df40e2c226cd3ec7$export$78e3044358792147(`git push ${$e1181c88df78847e$export$b2c618602f6acb32} --tags`);
};



const $3d4be95bac04087b$export$683f9f4843c07b19 = async (version)=>{
    await $df40e2c226cd3ec7$export$78e3044358792147(`git tag ${version}`);
};


const $51bb0293d98c833a$export$35ff605ec30dcd48 = async ()=>{
    const commits = await $614da927c656e026$export$c76cbc8af6040a47();
    if (commits.length === 0) {
        console.log("No commits found: aborting bump");
        return;
    }
    if (await $e3f708878f039a98$export$ad60db2a67d9e517(commits)) {
        console.log("Previous bump found: aborting bump");
        return;
    }
    await $dd39407a6c55c725$export$f3912e27b190ed8d();
    const pkg = await $d00624c5e0395f8d$export$58452b1f896d18ce();
    const current = pkg.version.toString();
    const calculatedVersion = $3e99bd3b79202329$export$c64ae365b10b6f6a(current, commits);
    const version = await $f889754ddad8110b$export$52f84dc7de3cd4b8(calculatedVersion);
    if (version === null) {
        console.log("No wording matched: aborting bump");
        return;
    }
    await $d688e08773f8faf9$export$3c0b7c85670b6d1a(version);
    await $3d4be95bac04087b$export$683f9f4843c07b19(version);
    await $4551542afe13c472$export$3ffcc9a890cc5e87();
    console.log(`Successfully bumped version from ${current} to ${version}`);
};


$51bb0293d98c833a$export$35ff605ec30dcd48();
process.on("unhandledRejection", (reason, promise)=>{
    console.error(`Error: ${reason} - ${promise}`);
    process.exit(1);
});


