## [Unreleased]

## [2.1.0 July 7 2019]
### Changes
- Split `globals` config into 2 modes, one for development and one for production.
- Replace React static files by CDN links.
### Features
- Use WebpackBar for better bundling experience.
- Update README, create `docs` to store old version documentations.
- Add json-loader to client Webpack config.

## [2.0.0 June 30 2019]
### BIG Changes
- `configs` is separated from this boilerplate, but included as a submodule, an infrastructure.
### Features
- New commands: `del-component`.
- Update `new-component`.

## [1.7.0 June 25 2019]
### Features
- Support async, await.

## [1.6.2 June 19 2019]
### Bug fixes
- Fix issue [#14](https://github.com/rezo-labs/universal-react-app/issues/14#issue-458003005)

## [1.6.1 June 15 2019]
### Bug fixes
- Fix issue [#12](https://github.com/rezo-labs/universal-react-app/issues/12#issue-456549764).

## [1.6.0 June 14 2019]
### Features
- Write tests for server.
- Update client tests.
- The `new-component` and `build` commands now use prompt instead of using options for better user experience.
- Write setup command.
- Update README.
### Bug fixes
- Fix tests for Head component.

## [1.5.0 June 1 2019]
### Features
- Update README.
- Add coverage for Jest test.
### Changes
- Simplify directory structure.
- Load fonts via Head component.

## [1.4.2] (May 31 2019)
### Changes
- Remove Axios.

## [1.4.1] (May 24 2019)
### Bug fixes
- Fix tests failed due to missing of babel-jest configs.

## [1.4.0] (May 22 2019)
### Features
- Integrate Storybook.js.
- Integrate Docker.
### Changes
- Allow to change PORT after building on production mode.
- Change license from GPL to MIT.
- Update version in package.json.
### Bug fixes
- Fix path of loadable-stats.json in renderer.js.


## [1.3.0] (May 18 2019)
### Features
- Write documentation.
- Beautify initial page UI.
- Separate Webpack configurations for better clarity.
- Implement SSR for `styled-components`.
- Add options for `build` script.
### Bug fixes:
- Fix `loadable-components` SSR setup not completed.

## [1.2.0] (May 13 2019)
### Features
- Upgrade to Babel 7.
- Migrate from `react-loadable` to `loadable-components`.
- Webpack can handle statis CSS files.
- Optimize logging.
### Bug fixes:
- Fix redux logging on production mode.
- Fix no font to load.
- Fix warning message when using hydrate without SSR.

## [1.1.0] (April 24 2019)
### Features
- Write [CHANGELOG.md](#) the right way.
- Add React Helmet component to replace EJS head templates.
### Bug fixes:
- Fix Webpack not clean templates on production.
- Add preloaded state to redux store.
- Resolve new-component script's path error and enhanced templates.
- Update dependencies by audit.
- Fix server static path on production.
- Fix babel-eslint error (https://github.com/babel/babel-eslint/issues/530)

## [1.0.0] (Jan 25 2019)
### Features:
- Use Styled-component to replace SASS and CSS.
- Useful life cycle scripts are available, script's loggings are less verbose.
- Huge change in configurations. Configurations were moved into a single folder for simplicity, only exposed one config file to the outside.
- Use Jest for testing, Enzyme for testing React's components.
- Prewrite React component template with `new-component`.
- Prewrite Server templates.
- Remove pre-build script for EJS templates. EJS templates were split into 2 separate folders used for development and production respectively.
- Use JSDoc for documentation.
- Automatically generate Bundle Analyzer report on production build.
- Linting generates HTML report and automatically open browser view.
### Bug fixes:
- Fix bug server not restarting upon changing server code sometimes.

## [0.1.0] (Nov 30, 2018)
- Initial public release.