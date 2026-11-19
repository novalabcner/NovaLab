# NovaLab — Google Apps Script

## Main entry point
Run `setupNovaLab()` manually once. It is idempotent and creates or reuses the root folders, Sheets workbook, Forms and triggers.

## Files
- `Config.gs`: root folder ID, property names and discipline constants.
- `Utils.gs`: properties, validation, IDs, locking and JSON helpers.
- `SetupService.gs`: folders, spreadsheet, setup and triggers.
- `FormsService.gs`: article and event Forms without unsupported upload questions.
- `FormsProcessing.gs`: form submit handlers, duplicate protection and image processing.
- `DocumentService.gs`: canonical Romanian and event Google Docs plus document parsing.
- `TranslationService.gs`: isolated Gemini translation with failures logged and original content preserved.
- `ContentApi.gs`: read-only public API.
- `appsscript.json`: timezone and OAuth scopes.

## Security
No API key or live secret is in source. Only explicitly uploaded public images are shared with a link. Raw response sheets and internal document references are never returned publicly.

## Google Forms
File Upload questions must be added manually. The processing code looks for `Imagine principală (copertă)` and `Imagini suplimentare` response titles.
