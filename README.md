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
                "export_file": "SAMPLE_METADATA",
                "overwrite_export_file": true,
                "data_units": {
                    "global_data": {
                        "meta_data": true
                    }
                }
            }
        },
        "sampleId2" : {
            "hostname": "Specific instance hostname",
            "clientId": "Specific OCAPI client ID",
            "clientPassword": "Specific OCAPI client password",
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

The `data_units` structure :
```json
{
    "sites": {
        "siteDEMO": {
            "active_data_feeds": true,
            "cache_settings": true,
            "campaigns_and_promotions": true,
            "content": true,
            "coupons": true,
            "customer_cdn_settings": true,
            "customer_groups": true,
            "custom_objects": true,
            "dynamic_file_resources": true,
            "distributed_commerce_extensions": true,
            "ocapi_settings": true,
            "payment_methods": true,
            "payment_processors": true,
            "redirect_urls": true,
            "search_settings": true,
            "shipping": true,
            "site_descriptor": true,
            "site_preferences": true,
            "static_dynamic_alias_mappings": true,
            "sitemap_settings": true,
            "slots": true,
            "sorting_rules": true,
            "source_codes": true,
            "stores": true,
            "tax": true,
            "url_rules": true,
            "gift_certificates": true
        },
        "otherSiteDEMO": {
            "all": true
        }
    },
    "libraries": {
        "libDEMO": true
    },
    "library_static_resources": {
        "siteDEMO": true,
        "sharedLibraryDemo": true
    },
    "catalogs": {
        "catalogDEMO": true
    },
    "catalog_static_resources": {
        "catalogStaticResDEMO": true
    },
    "price_books": {
        "pricebookDEMO": true
    },
    "inventory_lists": {
        "all": true
    },
    "customer_lists": {
        "siteDEMO": true
    },
    "assignments": {
        "assignmentDEMO": true
    },
    "global_data": {
        "preferences": true,
        "global_custom_objects": true,
        "job_schedules": true,
        "job_schedules_deprecated": true,
        "meta_data": true,
        "static_resources": true,
        "users": true,
        "access_roles": true,
        "geolocations": true,
        "custom_quota_settings": true,
        "oauth_providers": true,
        "ocapi_settings": true,
        "webdav_client_permissions": true,
        "services": true,
        "csc_settings": true,
        "page_meta_tags": true,
        "price_adjustment_limits": true,
        "csrf_whitelists": true,
        "sorting_rules": true,
        "system_type_definitions": true,
        "custom_types": true,
        "custom_preference_groups": true
    }
}
```

For more informations :
* https://developer.salesforce.com/docs/commerce/b2c-commerce/references/b2c-commerce-ocapi/globaljobs.html#site-archive-export
* https://salesforcecommercecloud.github.io/b2c-dev-doc/docs/upcoming/jobstepapi/html/index.html

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
# Run the export for sampleId1 configuration
# Override the archive name SAMPLE_DATA with OVERRIDE_SAMPLE_METADATA

npm run export sampleId1 OVERRIDE_SAMPLE_METADATA
```

## Get the archive file

When the export ends you can find the archive file in your *Business Manager*.
Go to *Administration > Site Development > Site Import & Export*.

The archive file will be here when the process is done.

## Licence

MIT © 2022 [Guillaume Brunier](https://github.com/guillaumebrunier)