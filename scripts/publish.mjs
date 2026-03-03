import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const rootDir = join(import.meta.dirname, "..");

function getWorkspacePackages() {
    const packages = [];

    const dirs = ["adaptors", "packages"];
    for (const dir of dirs) {
        const dirPath = join(rootDir, dir);
        if (!statSync(dirPath, { throwIfNoEntry: false })) continue;

        for (const name of readdirSync(dirPath)) {
            const pkgPath = join(dirPath, name, "package.json");
            try {
                const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
                if (!pkg.private) {
                    packages.push({
                        name: pkg.name,
                        version: pkg.version,
                        path: join(dirPath, name),
                    });
                }
            } catch {}
        }
    }

    return packages;
}

function getPublishedVersion(pkgName) {
    try {
        const result = execSync(`npm view ${pkgName} version --json`, {
            encoding: "utf-8",
            stdio: ["pipe", "pipe", "pipe"],
        });
        return JSON.parse(result.trim());
    } catch {
        return null;
    }
}

function publishPackage(pkgPath) {
    try {
        execSync(`pnpm publish --access public --no-git-checks`, {
            cwd: pkgPath,
            stdio: "inherit",
        });
        return true;
    } catch {
        return false;
    }
}

const packages = getWorkspacePackages();
console.log(`Found ${packages.length} packages to check\n`);

let published = 0;
let skipped = 0;
let failed = 0;

for (const pkg of packages) {
    const publishedVersion = getPublishedVersion(pkg.name);

    if (publishedVersion === pkg.version) {
        console.log(`[SKIP] ${pkg.name}@${pkg.version} (already published)`);
        skipped++;
        continue;
    }

    console.log(`[PUBLISH] ${pkg.name}@${pkg.version}`);
    if (publishPackage(pkg.path)) {
        published++;
    } else {
        failed++;
    }
}

console.log(`\nDone: ${published} published, ${skipped} skipped, ${failed} failed`);
