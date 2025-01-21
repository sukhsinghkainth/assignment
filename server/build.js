const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./src/server.js'], // Your entry file
    bundle: true,  // Bundle all the dependencies into a single file
    outfile: '../../../builds/phoneBridge/index.js', // Output file
    format: 'cjs',  // Output in ES Module format
    platform: 'node',  // Target Node.js environment
    sourcemap: false,  // Generate source maps for debugging
    minify: true,  // Minify the output for production
    external: ['pg-hstore'],  // Add pg-hstore as external
}).catch(() => process.exit(1));