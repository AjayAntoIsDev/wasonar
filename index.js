#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { login } from './commands/login.js';
import { devices } from './commands/devices.js';
import { online } from './commands/online.js';
import { exhaust } from './commands/exhaust.js';
import { profile } from './commands/profile.js';

const program = new Command();

const banner = chalk.cyanBright(
  figlet.textSync('WaSonar', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  })
);

program
  .name('wasonar')
  .description(chalk.hex('#FFD700')('WhatsApp Intelligence & Stress Testing Tool')) // Gold color
  .version('1.0.0')
  .addHelpText('before', `\n${banner}\n`)
  .configureOutput({
    // Visually style error messages
    outputError: (str, write) => write(chalk.red.bold(str))
  });


program.command('login')
  .description('Authenticate and save session credentials')
  .action(login);

program.command('devices')
  .argument('<number>', 'Target phone number')
  .option('--no-online', 'Skip checking online status')
  .option('-o, --output <dir>', 'Directory to save results')
  .description('Get all devices connected to a number')
  .action(devices);


program.command('online')
  .argument('<number>', 'Target phone number')
  .option('--probes <count>', 'Number of probes to send (0 for infinite)', '0')
  .option('-o, --output <dir>', 'Directory to save results')
  .description('Get online devices and RTT')
  .action(online);


program.command('exhaust')
  .argument('<number>', 'Target phone number')
  .option('--aggression <level>', 'Aggression level: aggressive (default), slow', 'aggressive')
  .option('--duration <seconds>', 'Attack duration in seconds', '60')
  .option('-o, --output <dir>', 'Directory to save logs')
  .description('Resource exhaustion / Stress test')
  .action(exhaust);


program.command('profile')
  .argument('<number>', 'Target phone number')
  .option('-o, --output <dir>', 'Directory to save results')
  .description('Extract name and profile picture')
  .action(profile);

program.parse();
