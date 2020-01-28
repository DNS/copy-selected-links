# Copy Selected Links

## For users

Official downloads:

- [Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/copy-selected-links/)
- [Chrome extension](https://chrome.google.com/webstore/detail/copy-selected-links/kddpiojgkjnpmgiegglncafdpnigcbij)

## For developers/reviewers

### Minimum setup

1. install [yarn](https://yarnpkg.com)
1. execute `yarn install --frozen-lockfile`
   1. if necessary, check `.node-version`, or install [nvs](https://github.com/jasongin/nvs) and execute `nvs use`

### Compiling to webext `.zip` file

1. execute `yarn build`
1. check `install` dir

### Testing

#### Additional setup

1. install [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/)
1. create blank profile called `dev`

#### Running

1. execute `yarn develop`
