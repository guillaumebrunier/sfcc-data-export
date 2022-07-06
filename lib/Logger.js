'use strict';

import chalk from 'chalk';

/**
 * Class Logger
 */
export default class Logger {
    /**
     * Constructor
     */
    constructor () {
        // nothing
    }

    /**
     * Debug
     * @param {string} msg
     */
    debug(msg) {
        console.log(chalk.white(msg));
    }

    /**
     * Info
     * @param {string} msg
     */
    info(msg) {
        console.log(chalk.blue(msg));
    }

    /**
     * Warn
     * @param {string} msg
     */
    warn(msg) {
        console.log(chalk.yellow(msg));
    }

    /**
     * Error
     * @param {string} msg
     */
    error(msg) {
        console.log(chalk.red(msg));
    }

    /**
     * Success
     * @param {string} msg
     */
    success(msg) {
        console.log(chalk.green(msg));
    }
}