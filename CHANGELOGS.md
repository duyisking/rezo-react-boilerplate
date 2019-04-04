## [Unreleased]
### Features
- Write [CHANGELOG.md](#) the right way.

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