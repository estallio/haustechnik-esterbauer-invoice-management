# Haustechnik Esterbauer Rechnungen

This repository contains a web app for creating and managing
offers and invoices, also available as a native app
for Windows, Mac and Linux by using the Electron framework.

![Screenshot](img/Screenshot.png)

### How to trigger build
```
git add some-files...
git commit -m "what was changed in some-files..."

// change version-property in packages/native/app/package.json
// e.g. to "1.0.17", add and commit changes like:

git add packages/native/app/package.json
git commit -m "version bump"

// tag the version and push tags (version must match):

git tag v1.0.17
git push && git push --tags

// - in sum, there are 2 builds started now because the release-build is triggered besides the default build on each commit and not instead - the default commit is tested as normal without pushing a release
```
