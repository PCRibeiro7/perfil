/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { dev }) => {
        if (dev && process.platform === 'win32') {
            const projectPath = __dirname
                .replace(/\\/g, '/')
                .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // Ancestor watchers can scan protected files at the drive root.
            config.watchOptions = {
                ...config.watchOptions,
                ignored: new RegExp(
                    `^(?!${projectPath}(?:/|$))|(?:^|/)(?:\\.git|\\.next)(?:/|$)`,
                    'i',
                ),
            };
        }

        return config;
    },
};

module.exports = nextConfig;
