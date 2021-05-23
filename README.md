# floc-spoofer

A browser extension that obfuscates your cohort id. When the extension is
installed, websites when requesting your cohort id will be given a cohort id
that is generated randomly instead one which about your behaviour.

Floc-spoofer is similar in spirit to [AdNauseam][0].

## Installation

## Usage

By default, the extension will generate a new cohort id for each page, however,
settings can be changed in the options page of the extension to change the
range of possible cohort ids that can be generated and to generate cohort ids
at different intervals (less often than for every page, or update it base on a
time duration).

## Building

```
$ npm i
$ ./build.sh
```

## License and Copyright

floc-spoofer is licensed under the GNU GENERAL PUBLIC LICENSE Version 2.

Copyright © 2020 Nils André-Chang

[0]: https://adnauseam.io
