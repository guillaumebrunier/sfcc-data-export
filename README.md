# SFCC Data Export

This project allows you to configure several types of data export and to launch them from the command line.

## Prerequisites
### API Client

You need an API client. If you don't already have one. You can create one at https://account.demandware.com/dw/account/Home

### Client permissions

You have to configure the rights for this API client on the target instance.

In your *Business Manager* go to *Administration > Site Development > Open Commerce API* Settings.

Select *Data* in *Global organization* context and add those following rights :

```json
{
    "client_id":"YOUR_CLIENT_ID",
    "resources":[
        {
            "resource_id":"/jobs/*/executions",
            "methods":[
                "post"
            ],
            "read_attributes":"(**)",
            "write_attributes":"(**)"
        },
        {
            "resource_id":"/jobs/*/executions/*",
            "methods":[
                "get"
            ],
            "read_attributes":"(**)",
            "write_attributes":"(**)"
        }
    ]
}
```

## Init project
After cloning the project, you have to install dependencies by running this command :

```bash
# install dependencies

npm install
```
## Set up configuration

You have to create the *config.json* file. You can start from the *config-sample.json* file in the root directory.

```json
{
    "hostname": "Your instance hostname",
    "clientId": "Your OCAPI client ID",
    "clientPassword": "Your OCAPI client password",
    "exports": {
        "sampleId1" : {
            "parameters" : {
                "__comment": "See documentation for the json structure : https://documentation.b2c.commercecloud.salesforce.com/DOC3/topic/com.demandware.dochelp/OCAPI/current/usage/DataAPIDocuments.html"
            }
        },
        "sampleId2" : {
            "hostname": "Specific instance hostname",
            "clientId": "Specific OCAPI client ID",
            "clientPassword": "Specific OCAPI client password",
            "parameters" : {
                "__comment": "See documentation for the json structure : https://documentation.b2c.commercecloud.salesforce.com/DOC3/topic/com.demandware.dochelp/OCAPI/current/usage/DataAPIDocuments.html"
            }
        },
        "sampleId3" : {
            "parameters" : {
                "export_file": "SAMPLE_METADATA",
                "overwrite_export_file": true,
                "data_units": {
                    "global_data": {
                        "meta_data": true
                    }
                }
            }
        }
    }
}
```

## Run an export

```
npm run export <exportId> <archiveName>(Optionnal)
```
* **exportId** : Must refers to a key under *exports* in your *config.json* file.
* **archiveName** : This parameter is not mandatory but if you want to override the *parameters.export_file* specified in the *config.json* file you can do it here.

Examples :
```bash
# Run the export for sampleId1 configuration

npm run export sampleId1
```

```bash
# Run the export for sampleId3 configuration
# Override the archive name SAMPLE_DATA with OVERRIDE_SAMPLE_METADATA

npm run export sampleId3 OVERRIDE_SAMPLE_METADATA
```

## Get the archive file

When the export ends you can find the archive file in your *Business Manager*.
Go to *Administration > Site Development > Site Import & Export*.

The archive file will be here when the process is done.

## Licence

MIT © 2022 [Guillaume Brunier](https://github.com/guillaumebrunier)