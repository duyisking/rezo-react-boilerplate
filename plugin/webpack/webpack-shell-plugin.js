// -----------------------------------------------------
// My customize plugin, original plugin from https://github.com/1337programming/webpack-shell-plugin
// -----------------------------------------------------

const { spawn } = require('child_process');

const puts = (error) => {
    if (error) {
        throw error;
    }
};

module.exports = class WebpackShellPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        if (!this.options.SSR) {
            compiler.hooks.compilation.tap('CompilationPlugin', (compilation) => {
                if (this.lastPID) {
                    const changedFiles = Object.keys(
                        compilation.compiler.watchFileSystem.watcher.mtimes,
                    );
                    if (
                        !changedFiles.length
                        || changedFiles.some(e => e.match(/src\/server/))
                    ) {
                        console.log('Executing CompilationPlugin scripts');
                        const proc = spawn('kill', ['-9', this.lastPID], { stdio: 'inherit' });
                        proc.on('close', puts);
                        this.lastPID = null;
                    }
                }
            });

            compiler.hooks.shouldEmit.tap('ShouldEmitPlugin', (compilation) => {
                const changedFiles = Object.keys(
                    compilation.compiler.watchFileSystem.watcher.mtimes,
                );
                return !changedFiles.length || changedFiles.some(e => e.match(/src\/server/));
            });
        }
        else {
            compiler.hooks.compilation.tap('CompilationPlugin', (compilation) => {
                if (this.lastPID) {
                    const changedFiles = Object.keys(
                        compilation.compiler.watchFileSystem.watcher.mtimes,
                    );
                    if (
                        !changedFiles.length
                        || changedFiles.some(e => !e.match('react-loadable.json'))
                    ) {
                        console.log('Executing CompilationPlugin scripts');
                        const proc = spawn('kill', ['-9', this.lastPID], { stdio: 'inherit' });
                        proc.on('close', puts);
                        this.lastPID = null;
                    }
                }
            });

            compiler.hooks.shouldEmit.tap('ShouldEmitPlugin', (compilation) => {
                const changedFiles = Object.keys(
                    compilation.compiler.watchFileSystem.watcher.mtimes,
                );
                return !changedFiles.length || changedFiles.some(e => !e.match('react-loadable.json'));
            });
        }

        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
            console.log('Executing AfterEmitPlugin scripts');
            const proc = spawn('node', ['./src/server/index.js'], { stdio: 'inherit' });
            this.lastPID = proc.pid;
            proc.on('close', puts);
        });

        compiler.hooks.watchClose.tap('WatchClosePlugin', () => {
            if (this.lastPID) {
                console.log('Executing WatchClosePlugin scripts');
                const proc = spawn('kill', ['-9', this.lastPID], { stdio: 'inherit' });
                proc.on('close', puts);
            }
        });
    }
};
