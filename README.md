# FlocBloc

A browser extension that obfuscates your cohort id. When the extension is
installed, websites when requesting your cohort id will be given a cohort id
that is generated randomly instead of one which reflects on your behaviour.

FlocBloc is similar in spirit to [AdNauseam][0].

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

The [logo](./assets/flocbloc-icon.png) is [originally][eff-logo-article] from
the [EFF][eff-copyright] and distributed under the [Creative Commons
Attribution License][ccal].

FlocBloc is licensed under the GNU GENERAL PUBLIC LICENSE Version 2.

Copyright © 2020 Nils André-Chang

[0]: https://adnauseam.io
[eff-logo-article]: https://www.eff.org/deeplinks/2021/03/google-testing-its-controversial-new-ad-targeting-tech-millions-browsers-heres
[eff-copyright]: https://www.eff.org/copyright
[ccal]: https://creativecommons.org/licenses/by/3.0/us/
