const esbuild = require("esbuild");

async function build() {
    try {
        await esbuild.build({
            entryPoints: ["./src/index.js"],
            bundle: true,
            minify: false,
            outfile: "dist/main.js",
            loader: { ".js": "jsx" },
            jsxFactory: "React.createElement", // Optional if you want to keep the old behavior
            jsxFragment: "React.Fragment", // Optional if you want to keep the old behavior
            jsx: "automatic", // This enables the new JSX transform
        });
        console.log("Build successful");
    } catch (error) {
        console.error("Error during build:", error);
    }
}

build();