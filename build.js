const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

async function findIndexFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory() && file !== 'node_modules') {
            results = results.concat(await findIndexFiles(filePath)); // Await the recursive call
        } else if (file === 'index.js') {
            results.push(filePath); // Add index.js file to results
        }
    }
    return results;
}

async function build() {
    const entries = await findIndexFiles('./examples'); // Await the function to get the results

    for (const entry of entries) {
        const output = path.join(path.dirname(entry), "bundle.js"); // Ensure entry is a string

        try {
            await esbuild.build({
                entryPoints: [entry],
                bundle: true,
                minify: false,
                outfile: output,
                loader: { ".js": "jsx" },
                jsxFactory: "React.createElement",
                jsxFragment: "React.Fragment",
                jsx: "automatic",
            });
            console.log(`Build successful for ${output}`);
        } catch (error) {
            console.error(`Error during build for ${output}:`, error);
        }
    }
}

build();