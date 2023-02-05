# Translates marked Text

## Description

- You can choose to translate text from the context menu or by click the text twice.
- To enabled tranlation by clicking twice, you have to enabled it via the addon's browser action.

## Run the extension while developing

    web-ext run

## Build the extension

    web-ext build

## Signing the extension
### First Time
When signing the extension for the first time and there is no id specified in the manifest.json, then the Tool web-ext will generate and print the fresh "Extension ID" into the console.

    web-ext sign --api-key=<your-api-key> --api-secret=<your-secret>

Output

    Applying config file: .\web-ext-config.js
    Building web extension from C:\Users\NoAdmin\Downloads\transinfo\Transinfo\src
    No extension ID specified (it will be auto-generated)
    Validating add-on [.........................................................................................................................]Validation results: https://addons.mozilla.org/en-US/developers/upload/e355fcc029004af4b857c4021b380d97
    Signing add-on [............................................................................................................................]Downloading signed files: 100%
    Downloaded:
        .\web-ext-artifacts\5192c9f961df4946a149-0.0.1.xpi
    Extension ID: {aea13d52-830f-4071-a66f-c747ae358c27}
    SUCCESS

### For Updates

    web-ext sign --api-key=<your-api-key> --api-secret=<your-secret> --id=<your-id>