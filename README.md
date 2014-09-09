grunt
=====

Gruntfile and package.json for an E3 workflow

##Configuration & Usage

###Initial Setup

If you haven’t already, install node.js and Grunt’s CLI
```
brew install node
npm install -g grunt-cli
```

For each site, you’ll need to configure package.json appropriately, then run:
```
npm install
```
Make sure the *node_modules* folder is listed in your .gitignore

### Commands

**grunt**: An alias of the watch command; watches for changes in scss and js files, then uses compass and concatenate to compile and compress

**grunt log**: displays some available package variables about our project

**grunt launch**: not yet configured; provides a sequence of events to enforce our launch workflow

## Contents
Here’s a list of currently enabled grunt plugins and what they’re used for:
(todo)