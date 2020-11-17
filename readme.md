# Copy Selected Links

## For users

Official downloads:

- [Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/copy-selected-links/)
- [Chrome extension](https://chrome.google.com/webstore/detail/copy-selected-links/kddpiojgkjnpmgiegglncafdpnigcbij)

## For developers & reviewers

### Setup

1. check `.node-version` and install [nodejs](https://nodejs.org/)  
   (with [nvs](https://github.com/jasongin/nvs): execute `nvs use`)
2. install [pnpm](https://pnpm.js.org)
   - set an env var `npm_config_store_dir` to an [appropriate path](https://pnpm.js.org/en/faq#does-pnpm-work-across-multiple-hard-drives-or-filesystems): a disposable directory in the same filesystem as this repository where pnpm can cache its packages
3. execute `pnpm install`

### Testing

1. install [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or [your Chrome of choice](https://dev.chromium.org/getting-involved/dev-channel)
2. execute `pnpm compile`
3. execute any of the following:
   - `pnpm package` to build the webext zip into `./dist`
   - `pnpm start` to run the addon in Firefox
   - `pnpm start:chrome` to run the addon in Chrome
