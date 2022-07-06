'use strict';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const sfcc = require('sfcc-ci');
const job = require('sfcc-ci/lib/job');

/**
 * Class DataExportMgr
 */
export default class DataExportMgr {
    /**
     * Constructor
     * @param {Object} config
     * @param {Object} logger
     */
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }

    /**
     * Run export based on export identifier
     * @param {string} exportId
     * @param {string} archiveName
     */
    run(exportId, archiveName) {
        if (!this.config.exports[exportId]) {
            throw new Error(`Missing export configuration [${exportId}].`);
        }

        if (!this.config.exports[exportId].parameters) {
            throw new Error(`Missing [parameters] for configuration [${exportId}].`);
        }

        const finalArchiveName = archiveName || this.config.exports[exportId].parameters.export_file;
        const finalClientId = this.config.exports[exportId].clientId || this.config.clientId;
        const finalClientPassword = this.config.exports[exportId].clientPassword || this.config.clientPassword;
        const finalHostname = this.config.exports[exportId].hostname || this.config.hostname;

        if (!finalArchiveName) {
            throw new Error('No archive name provided. Check your config.json file.');
        }

        if (!finalClientId) {
            throw new Error('Missing clientId. Check your config.json file.');
        }

        if (!finalClientPassword) {
            throw new Error('Missing clientPassword. Check your config.json file.');
        }

        this.logger.debug(`Authenticate user with clientId: ${finalClientId}, clientPassword: ${finalClientPassword}`);
        sfcc.auth.auth(finalClientId, finalClientPassword, (err, token) => {
            if (token) {
                this.logger.success(`User authenticated. Token: ${token}`);

                const finalExportParameters = this.config.exports[exportId].parameters;
                finalExportParameters.export_file = finalArchiveName;

                this.logger.debug(`Export request with hostname: ${finalHostname}, token: ${token}, parameters: ${JSON.stringify(finalExportParameters)}`);
                job.api.run(finalHostname, 'sfcc-site-archive-export', finalExportParameters, token, (err, res) => {
                    if (res) {
                        if (res.statusCode === 202) {
                            this.logger.success(`Export request in progress, check for your archive file in Administration > Site Development > Site Import & Export.\nResponse: ${JSON.stringify(res.body)}`);
                        } else {
                            this.logger.error(`Fail to run export.\nResponse: ${JSON.stringify(res.body)}`);
                        }
                    } else {
                        this.logger.error('Fail to run export.');
                    }
                });
            } else {
                this.logger.error(`Fait to authenticate user with clientId: ${finalClientId}, clientPassword: ${finalClientPassword}`);
            }
        });
    }
}