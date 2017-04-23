# ng-material-crank

This project was created in order to try features of [Angular](https://angular.io) and [Angular Material](https://material.angular.io) on. In a few words, this is a single page app which loads photos from [Flickr](https://www.flickr.com/) using [Http](https://angular.io/docs/ts/latest/api/http/index/Http-class.html) and shows them in the form of [cards](https://material.angular.io/components/component/card). The cards are divided into three groups that are actually [Routes](https://angular.io/docs/ts/latest/api/router/index/Routes-type-alias.html): the photostream, the list of photo albums and the content of the albums.

Please visit the live demo to test the app in action:

https://ng-material-crank.herokuapp.com

## Legal
This software uses the [Flickr API](https://www.flickr.com/services/api/) but is not endorsed or certified by Flickr.

The source code is distributed under the [MIT license](https://opensource.org/licenses/MIT). Its copy is available in `LICENSE` file. The terms of the license don't apply to photos obtained from Flickr. Each photo may have its own author and license.

## Setup

* Install [Node](https://nodejs.org) and [Yarn](https://yarnpkg.com)
* Clone the repo `git clone https://github.com/AndreySenov/ng-material-crank.git` **[\*]**
* Change the current working directory to the clone location `cd ng-material-crank`
* Run `git update-index --assume-unchanged define.json`
* Open `define.json` file and replace the asterisks with your [Flickr API key](https://www.flickr.com/services/api/misc.api_keys.html) and user id:

```json
{
  "flickr": {
    "apiKey": "********",
    "userId": "********"
  }
}
```
* Run `yarn` to download dependencies

**\*** Alternatively, you can either  [fork](https://help.github.com/articles/fork-a-repo) the repo first then clone your fork or just download a ZIP archive with the source code.

## Build

Run `yarn build` to make a production build of the project. The build artifacts are placed in `build/` subdirectory. There will be three bundles: `app.js`, `app.css` and `vendor.js`. Surely, you have already guessed the purpose of each of them:

* `app.js` contains the application code along with external HTML templates of Angular components.
* `app.css` amalgamates all `CSS`, `SCSS` and `SASS` files of the project. If you want to add a 3rd party file to this bundle, import one to `src/app/app.component.scss` file.
* `vendor.js` aggregates the 3rd party dependencies. When you [add](https://yarnpkg.com/lang/en/docs/cli/add/) a new production dependency to the project, import one to `src/vendor.ts` file as well; otherwise, this dependency will be included in `app.js` bundle.

## Development server

Run `yarn serve` to start serving a development bundle on port `8080`. The app will be available at `localhost:8080` and automatically reloaded when any source files are changed. The bundle contains source maps so you'll be able to debug the code. If you need to choose a different port number, add `port: <number>` entry to `devServer` section of `webpack.config.js` file.
