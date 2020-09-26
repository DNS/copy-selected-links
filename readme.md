# Copy Selected Links

## For users

Official downloads:

-   [Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/copy-selected-links/)
-   [Chrome extension](https://chrome.google.com/webstore/detail/copy-selected-links/kddpiojgkjnpmgiegglncafdpnigcbij)

## For developers & reviewers

### Setup

1. check `.node-version` and install [nodejs](https://nodejs.org/)  
   (with [nvs](https://github.com/jasongin/nvs): execute `nvs use`)
2. install [yarn](https://yarnpkg.com)
3. execute `yarn install`

### Compiling webext zip

1. execute `yarn build`
2. check `dist` dir

### Testing

1. install [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/) or [your Chrome of choice](https://dev.chromium.org/getting-involved/dev-channel)
2. execute `yarn develop` or `yarn develop:chrome`
