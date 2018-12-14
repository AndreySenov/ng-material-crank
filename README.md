[license]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/AndreySenov/ng-material-crank/blob/master/LICENSE

[build]: https://travis-ci.org/AndreySenov/ng-material-crank.svg?branch=master
[build-url]: https://travis-ci.org/AndreySenov/ng-material-crank

[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-welcome-url]: https://github.com/AndreySenov/ng-material-crank/pulls

[deps]: https://david-dm.org/AndreySenov/ng-material-crank/status.svg
[deps-url]: https://david-dm.org/AndreySenov/ng-material-crank

[deps-dev]: https://david-dm.org/AndreySenov/ng-material-crank/dev-status.svg
[deps-dev-url]: https://david-dm.org/AndreySenov/ng-material-crank?type=dev

# ng-material-crank
[![license][license]][license-url]
[![build][build]][build-url]
[![prs-welcome][prs-welcome]][prs-welcome-url]
[![deps][deps]][deps-url]
[![deps-dev][deps-dev]][deps-dev-url]

This project was created in order to try features of [Angular](https://angular.io), [Angular Material](https://material.angular.io) and [Webpack](https://webpack.js.org/). In a nutshell, this is a single-page app which loads photos from [Flickr](https://www.flickr.com/) using [Http](https://angular.io/docs/ts/latest/api/http/index/Http-class.html) and shows them in the form of [cards](https://material.angular.io/components/component/card). The cards are divided into three groups that are actually [Routes](https://angular.io/docs/ts/latest/api/router/index/Routes-type-alias.html): the photostream, the list of photo albums and the content of the albums.

Please visit the [live demo](https://ng-material-crank.firebaseapp.com) to test the app in action.

## Legal
This software uses the [Flickr API](https://www.flickr.com/services/api/) but is not endorsed or certified by Flickr.

The source code is distributed under the [MIT license](https://opensource.org/licenses/MIT). Its copy is available in the `LICENSE` file. The terms of the license don't apply to photos/videos obtained from Flickr. Each photo/video may have its own author and license.

## Setup

* Install [Node](https://nodejs.org) and [Yarn](https://yarnpkg.com)
* Clone the repo `git clone https://github.com/AndreySenov/ng-material-crank.git` **[\*]**
* Change the current working directory to the clone location `cd ng-material-crank`
* Run `git update-index --assume-unchanged define.json`
* Open the `define.json` file and replace the asterisks with your [Flickr API key](https://www.flickr.com/services/api/misc.api_keys.html) and user id:

```json
{
  "flickr": {
    "apiKey": "********",
    "userId": "********"
  }
}
```
* Run `yarn` to download dependencies

**\*** Alternatively, you can either [fork](https://help.github.com/articles/fork-a-repo) the repo first then clone your fork or just download a ZIP archive with the source code.

## Build

Run `yarn build` to make a production build of the project. The build artifacts are placed in the `dist/` subdirectory. There will be the following chunks:

* `runtime.{hash}.js` - the Webpack runtime chunk.
* `polyfill.{hash}.js` - polyfilling libs.
* `vendor.{hash}.js` - 3rd party dependencies.
* `app.{hash}.js` - the application code along with external `HTML` templates of Angular components.
* `vendor.{hash}.css` - style rules imported from 3rd party libs.
* `app.{hash}.css` - the application style rules.

## Development server

Run `yarn serve` to start serving a development bundle on port `8080`. The app will be available at `localhost:8080` and automatically reloaded when any source files are changed. The bundle contains source maps so you'll be able to debug the code. If you need to choose a different port number, add `port: <number>` entry to the `devServer` section of the `webpack.config.ts` file.
