var $bVBmg$picocolors = require("picocolors");
var $bVBmg$fs = require("fs");
var $bVBmg$path = require("path");
var $bVBmg$child_process = require("child_process");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $a333fb01d2059b05$export$a7b6bc01c63cdfc3 = (name, defaultValue)=>{
    return process.env[name] ?? defaultValue;
};


const $50739fa6c824bba9$export$db8bb791c0a06140 = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("GITHUB_EVENT_PATH");
const $50739fa6c824bba9$export$da7dc787b5bb24a3 = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("GITHUB_WORKSPACE");
const $50739fa6c824bba9$export$8237651927eeefcf = Boolean($a333fb01d2059b05$export$a7b6bc01c63cdfc3("GITHUB_HEAD_REF"));
const $50739fa6c824bba9$export$b2c618602f6acb32 = `https://${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`;
const $50739fa6c824bba9$export$ff09b90989b21a8 = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("GUTHUB_USER", "Automated Version Bump");
const $50739fa6c824bba9$export$61171c632678b12e = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("GUTHUB_EMAIL", "bump-package-version-action@users.noreply.github.com");
const $50739fa6c824bba9$export$a04746c34337686a = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("INPUT_TAG_PREFIX", "");
const $50739fa6c824bba9$export$eceeda9df681e8de = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("INPUT_COMMIT_MESSAGE", "ci: version bump to {{version}}");
const $50739fa6c824bba9$export$4fa4a22200055c8a = new RegExp($50739fa6c824bba9$export$eceeda9df681e8de.replace(/{{version}}/g, `${$50739fa6c824bba9$export$a04746c34337686a}\\d+\\.\\d+\\.\\d+`), "ig");
const $50739fa6c824bba9$export$9c22c0b0c1bcc7b5 = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("INPUT_MAJOR_WORDING", "BREAKING CHANGES").split(",");
const $50739fa6c824bba9$export$945cdec32488ff3d = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("INPUT_MINOR_WORDING", "feat").split(",");
const $50739fa6c824bba9$export$7c6e2bf360dbbe96 = $a333fb01d2059b05$export$a7b6bc01c63cdfc3("INPUT_PATCH_WORDING", "fix").split(",");


const $e61a77b4ac15157d$export$7614f1c7608a9f16 = (commits)=>{
    return commits.map((commit)=>commit.message
    );
};


const $290c18f650515f9f$export$ad60db2a67d9e517 = async (commits)=>{
    const messages = $e61a77b4ac15157d$export$7614f1c7608a9f16(commits);
    return messages.some((message)=>$50739fa6c824bba9$export$4fa4a22200055c8a.test(message)
    );
};





const $eeaf695a30fb70b0$var$fsExists = async (filePath)=>$bVBmg$fs.promises.access(filePath, $bVBmg$fs.constants.F_OK).then(()=>true
    , ()=>false
    )
;
const $eeaf695a30fb70b0$export$58452b1f896d18ce = async ()=>{
    const pathToPackage = ($parcel$interopDefault($bVBmg$path)).join($50739fa6c824bba9$export$da7dc787b5bb24a3, "package.json");
    if (!$eeaf695a30fb70b0$var$fsExists(pathToPackage)) throw new Error("package.json could not be found in your project's root");
    return import(pathToPackage);
};



const $ec73e446ce58e1b8$export$c76cbc8af6040a47 = async ()=>{
    return $50739fa6c824bba9$export$db8bb791c0a06140 ? (await import($50739fa6c824bba9$export$db8bb791c0a06140)).commits : [];
};


const $2c8a5fd445b4f5af$export$675fe7fcc48d1ee8 = (version, commits)=>{
    const latestHash = commits[commits.length - 1].hash;
    return version.replace(/-rc-.*/, "") + `-rc-${latestHash}`;
};




const $5e8ecf245e258d00$export$9a4ff46b96c101f8 = (messages, words)=>{
    return messages.some((message)=>words.some((word)=>message.startsWith(word)
        )
    );
};


const $19afaf8d5f0ab2cd$export$d6875ac9e42c5d13 = (commits)=>{
    const messages = $e61a77b4ac15157d$export$7614f1c7608a9f16(commits);
    switch(true){
        case $5e8ecf245e258d00$export$9a4ff46b96c101f8(messages, $50739fa6c824bba9$export$9c22c0b0c1bcc7b5):
            return "major";
        case $5e8ecf245e258d00$export$9a4ff46b96c101f8(messages, $50739fa6c824bba9$export$945cdec32488ff3d):
            return "minor";
        case $5e8ecf245e258d00$export$9a4ff46b96c101f8(messages, $50739fa6c824bba9$export$7c6e2bf360dbbe96):
            return "patch";
        default:
            return null;
    }
};



const $60bdc3a73a3545de$export$c64ae365b10b6f6a = (current, commits)=>{
    if ($50739fa6c824bba9$export$8237651927eeefcf) return $2c8a5fd445b4f5af$export$675fe7fcc48d1ee8(current, commits);
    else return $19afaf8d5f0ab2cd$export$d6875ac9e42c5d13(commits);
};





const $cf7cc6ee3b06988f$export$78e3044358792147 = (command)=>{
    return new Promise((resolve, reject)=>{
        $bVBmg$child_process.exec(command, {
            cwd: $50739fa6c824bba9$export$da7dc787b5bb24a3
        }, (err, stdout, stderr)=>{
            if (!err) resolve(stdout);
            reject(`${stderr}\n${command} exited with code ${err.code}`);
        });
    });
};


const $3f4c9eac338cd553$export$f3912e27b190ed8d = async ()=>{
    await $cf7cc6ee3b06988f$export$78e3044358792147(`git config user.name ${$50739fa6c824bba9$export$ff09b90989b21a8}`);
    await $cf7cc6ee3b06988f$export$78e3044358792147(`git config user.email ${$50739fa6c824bba9$export$61171c632678b12e}`);
};



const $90d7cb03e666b1f2$export$52f84dc7de3cd4b8 = async (version)=>{
    return await $cf7cc6ee3b06988f$export$78e3044358792147(`npm version --git-tag-version=false ${version}`);
};




const $89146453f4e0f5ea$export$3c0b7c85670b6d1a = async (version)=>{
    const commitMessage = $50739fa6c824bba9$export$eceeda9df681e8de.replace(/{{version}}/g, version);
    await $cf7cc6ee3b06988f$export$78e3044358792147(`git commit -a -m ${commitMessage}`);
};




const $9dc0c08c6aad3494$export$3ffcc9a890cc5e87 = async ()=>{
    await $cf7cc6ee3b06988f$export$78e3044358792147(`git push ${$50739fa6c824bba9$export$b2c618602f6acb32}`);
    await $cf7cc6ee3b06988f$export$78e3044358792147(`git push ${$50739fa6c824bba9$export$b2c618602f6acb32} --tags`);
};



const $4b1b44dba63e1a7e$export$683f9f4843c07b19 = async (version)=>{
    await $cf7cc6ee3b06988f$export$78e3044358792147(`git tag ${version}`);
};


const $60fe92cdaf58379f$export$35ff605ec30dcd48 = async ()=>{
    const commits = await $ec73e446ce58e1b8$export$c76cbc8af6040a47();
    if (commits.length === 0) {
        console.log("No commits found: aborting bump");
        return;
    }
    if ($290c18f650515f9f$export$ad60db2a67d9e517(commits)) {
        console.log("Previous bump found: aborting bump");
        return;
    }
    await $3f4c9eac338cd553$export$f3912e27b190ed8d();
    const pkg = await $eeaf695a30fb70b0$export$58452b1f896d18ce();
    const current = pkg.version.toString();
    const calculatedVersion = $60bdc3a73a3545de$export$c64ae365b10b6f6a(current, commits);
    const version = await $90d7cb03e666b1f2$export$52f84dc7de3cd4b8(calculatedVersion);
    if (version === null) {
        console.log("No wording matched: aborting bump");
        return;
    }
    await $89146453f4e0f5ea$export$3c0b7c85670b6d1a(version);
    await $4b1b44dba63e1a7e$export$683f9f4843c07b19(version);
    await $9dc0c08c6aad3494$export$3ffcc9a890cc5e87();
    console.log(($parcel$interopDefault($bVBmg$picocolors)).green(`Successfully bumped version from ${($parcel$interopDefault($bVBmg$picocolors)).bold(current)} to ${($parcel$interopDefault($bVBmg$picocolors)).bold(version)}`));
};


$60fe92cdaf58379f$export$35ff605ec30dcd48();
process.on("unhandledRejection", (reason)=>{
    console.error(($parcel$interopDefault($bVBmg$picocolors)).red(`Error: ${reason}`));
    process.exit(1);
});


