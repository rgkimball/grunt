grunt
=====

Gruntfile and package.json for an E3 workflow

#Configuration & Usage

##Initial Setup

If you haven’t already, install node.js and Grunt’s CLI

```
brew install node
npm install -g grunt-cli
```

For a site with grunt already configured, navigate to the project's directory and run:

```
npm install
```

For new sites, copy a fresh Gruntfile.js and package.json into the project's directory (at the same level as capistrano/drush), then run ```npm install```.

Make sure the *node_modules* folder is listed in your .gitignore

## LiveReload Setup

For complete installation instructions, check out [LiveReload's browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions). Once it's set up, just run ```grunt``` and your page should be refreshed when your theme files change.

## Available Tasks

```grunt```: An alias of the watch command; watches for changes in scss and js files, then uses compass and concatenate to compile and compress

```grunt log```: displays some available package variables about our project

```grunt launch```: not yet configured; provides a sequence of events to enforce our launch workflow

# Contents
Here’s a list of currently enabled grunt plugins and what they’re used for:

- [**grunt-contrib-compass**](https://github.com/gruntjs/grunt-contrib-compass) (~0.7.0): Runs compass if any Sass files are changed while grunt is running
- [**grunt-contrib-concat**](https://github.com/gruntjs/grunt-contrib-concat) (~0.5.0): Used to compile js files into one file (called theme-name.js)
- [**grunt-contrib-imagemin**](https://github.com/gruntjs/grunt-contrib-imagemin) (~0.7.1): Minifies any images in the theme-name/images folder
- [**grunt-contrib-jshint**](https://github.com/gruntjs/grunt-contrib-jshint) (^0.10.0): *Not used*
- [**grunt-contrib-watch**](https://github.com/gruntjs/grunt-contrib-watch) (~0.6.1): Implements basic grunt watch functionality and livereload
- [**grunt-prompt**](https://github.com/dylang/grunt-prompt) (^1.1.0): Used to select development environments and set commit messages during ```grunt launch```
- [**grunt-shell**](https://github.com/sindresorhus/grunt-shell) (^0.7.0): Used to run shell commands for various tasks.

## @todo

- [ ] Build git flow tasks based on branch context
- [ ] Write a better JS watch system
- [ ] Incorporate requirejs
- [ ] Run compass watch once on load to check for files that were changed while grunt wasn't running
- [ ] Capistrano implementation