const esbuild = require("esbuild");
const glob = require("glob");
const path = require("path");

async function build() {
    // Use glob to find all index.js files in src folders, excluding node_modules
    const entries = glob.sync("./**/src/index.js", { ignore: ["**/node_modules/**"] });

    for (const entry of entries) {
        const output = path.join(path.dirname(entry), "bundle.js"); // Output to the same directory as the input

        try {
            await esbuild.build({
                entryPoints: [entry],
                bundle: true,
                minify: false,
                outfile: output,
                loader: { ".js": "jsx" },
                jsxFactory: "React.createElement", // Optional if you want to keep the old behavior
                jsxFragment: "React.Fragment", // Optional if you want to keep the old behavior
                jsx: "automatic", // This enables the new JSX transform
            });
            console.log(`Build successful for ${output}`);
        } catch (error) {
            console.error(`Error during build for ${output}:`, error);
        }
    }
}

build();