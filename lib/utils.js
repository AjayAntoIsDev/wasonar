import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function checkAuth() {
    const authPath = path.resolve('auth_info_baileys');
    if (!fs.existsSync(authPath) || fs.readdirSync(authPath).length === 0) {
        console.error(chalk.red('Error: NOT AUTHENTICATED.'));
        console.error(chalk.yellow('Please run `wasonar login` first to setup the tool.'));
        process.exit(1);
    }
}
