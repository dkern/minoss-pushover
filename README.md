# Pushover for Minoss
[![GitHub version](https://badge.fury.io/gh/eisbehr-%2Fminoss-pushover.svg)](http://github.com/eisbehr-/minoss-pushover)
[![NPM version](https://badge.fury.io/js/minoss-pushover.svg)](http://www.npmjs.org/package/minoss-pushover)
[![Dependency version](https://david-dm.org/eisbehr-/minoss-pushover.png)](https://david-dm.org/eisbehr-/minoss-pushover)

This module adds support for Pushover notifications to [Minoss](https://github.com/eisbehr-/minoss) server.
The API communication is based on [`pushover-notifications`](https://www.npmjs.com/package/pushover-notifications).


## Table Of Contents
* [Installation](#installation)
* [Configuration](#configuration)
* [Basic Usage](#basic-usage)
* [Parameter Shorthand](#parameter-shorthand)
* [Bugs / Feature request](#bugs--feature-request)
* [License](#license)
* [Donation](#donation)


---


## Installation
Inside your Minoss root folder just use [npm](http://npmjs.com) to install this Module.

```SH
$ npm install minoss-pushover
```


## Configuration


## Basic Usage


### Parameter Shorthand
All request parameters can be shorten to it's first character (_except `url_title` and `timestamp` which are shorten with `ut` and `ts`_).
With this it is possible to use shorten URLs.

```TEXT
app        ->  a
message    ->  m
device     ->  d
title      ->  t
url        ->  u
url_title  ->  ut (!)
priority   ->  p
timestamp  ->  ts (!)
sound      ->  s
```

Example:

> http://localhost:8080/pushover/send?**app**=default&**priority**=1&**device**=*  
> http://localhost:8080/pushover/send?**a**=default&**p**=1&**d**=*


## Bugs / Feature request
Please [report](http://github.com/eisbehr-/minoss-pushover/issues) bugs and feel free to [ask](http://github.com/eisbehr-/minoss-pushover/issues) for new features directly on GitHub.


## License
Minoss is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.


## Donation
_You like to support me?_  
_You appreciate my work?_  
_You use it in commercial projects?_  
  
Feel free to make a little [donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=93XQ8EYMSWHC6)! :wink:
