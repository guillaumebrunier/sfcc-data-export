'use strict';

import fs from 'fs';
import Logger from './lib/Logger.js';
import DataExportMgr from './lib/DataExportMgr.js';
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const logger = new Logger();

// Parameters
const exportId = process.argv[2];
if (!exportId) {
    logger.error('Missing parameter [exportId]. Use npm run export <exportId> <archiveName>(optionnal).');
    process.exit(0);
}

const archiveName = process.argv[3] || null;
if (!archiveName) {
    logger.info('Optional parameter [archiveName] not provided.');
}

// Load configuration
if (!fs.existsSync('./config.json')) {
    logger.error('Missing [config.json] file.');
    process.exit(0);
}

// Export data
try {
    const config = require('./config.json');
    const dataExportMgr = new DataExportMgr(config, logger);
    dataExportMgr.run(exportId, archiveName);
} catch (e) {
    logger.error(e.message);
}