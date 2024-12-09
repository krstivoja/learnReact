const esbuild = require("esbuild");
const fs = require("fs").promises;
const path = require("path");

async function findIndexFiles(dir) {
    let results = [];
    const list = await fs.readdir(dir, { withFileTypes: true }); // Use withFileTypes for cleaner checks
    for (const file of list) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory() && file.name !== "node_modules") {
            results = results.concat(await findIndexFiles(filePath));
        } else if (file.isFile() && file.name === "index.js") {
            results.push(filePath);
        }
    }
    return results;
}

async function build() {
    try {
        const entries = await findIndexFiles("./examples");
        console.log(`Found ${entries.length} index.js files to build.`);
        if (entries.length === 0) {
            console.log("No files to build.");
            return;
        }

        const buildPromises = entries.map((entry) => {
            const output = path.join(path.dirname(entry), "bundle.js");
            return esbuild
                .build({
                    entryPoints: [entry],
                    bundle: true,
                    minify: false,
                    outfile: output,
                    loader: { ".js": "jsx" },
                    jsxFactory: "React.createElement",
                    jsxFragment: "React.Fragment",
                    jsx: "automatic",
                })
                .then(() => console.log(`Build successful for ${output}`))
                .catch((error) => {
                    console.error(`Error during build for ${output}:`, error);
                    return null; // Prevent Promise.all from rejecting
                });
        });

        const results = await Promise.all(buildPromises);
        const failedBuilds = results.filter((result) => result === null);
        if (failedBuilds.length > 0) {
            console.error(`${failedBuilds.length} builds failed.`);
        } else {
            console.log("All builds completed successfully.");
        }
    } catch (error) {
        console.error("Error during build process:", error);
    }
}

build();