# native

### Usage
As the electron framework takes care of finding and downloading the right dependencies for each host-os, we simply can call the start and package commands of the electron framework. But before we can do this, we have to build and integrate the outcome of the dependent packages. For this, a prepare-command builds and copies necessary outcomes into the app-folder of this project. Even though, the src-folder contains the source, the content in the app folder is packaged into the electron-app. For this reason, the files in the src folder are compiled into a single main.prod.js file in the app-folder before electron is started.

```
// is automatically called at start-up/yarn install
// builds the dependet packages and copies their dist folder into this project 
yarn prepare

// builds the electron script and starts up an electron-instance
yarn start

// builds a production-ready electron application
yarn package
```

The prepare script makes use of the USE_HASH_HISTORY env-variable in the web package for using a router with hash-history in builds. Explanation: a default browser-history uses domain resolution like https://domain.at/route while a hash history uses https://domain.at/#/route. This is necessary because electron does all routes on a single html-file and specifying a different route is like searching a different path, while the web package can be configured with nginx to route all traffic to the single html file on the server-side.

For now, the history-switching is sufficient.

### Tips and Tricks
* Because the dist folders are only copied once, changes in the respective packages do not take effect when electron is started again. Call yarn prepare beforehand.
* Take care of native dependencies and look at the electron-builder documentation how to integrate and build them.

### Docker
Linux and Windows can be built in a docker-container. For this, just have a look at the electron-builder documentation [here](https://www.electron.build/multi-platform-build).
From the root folder call:
```
// starts the respective docker-container
docker run --rm -ti \
 --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ${PWD##*/}-node-modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine

// installs dependencies - maybe a fresh start is necessary beforehand
// so cleanup project (remove node_modules and dists and so on - scripts exit)
yarn

// build for the respective platform
// platforms can be specified and configured in package.json
yarn package
```

### Linux and MacOS
Electron-builder seems to have problems at cross compiling.
When packaging the application for linux or mac this needs to be done on the corresponding target platform.

### Automated Github workflow builds
https://github.com/marketplace/actions/electron-builder-action
