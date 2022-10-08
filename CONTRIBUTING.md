# Contributing

Contributions of any size are welcome!

For bug reports, please make an [issue](https://github.com/ivynya/Caravel/issues/new/choose) on this repository.

For feature requests, please make an [issue](https://github.com/ivynya/Caravel/issues/new/choose) or post a [discussion thread](https://github.com/ivynya/Caravel/discussions/new) before you start coding - this ensures that duplicate work isn't done and the design is as good as it can be.

## Commit Prefixes

Please use one of the following commit prefixes for each commit you make:

1. `feat:` Your change makes significant code changes, adds a new feature, or affects UX
2. `style:` Your change affects UI, components, or visual elements only
3. `repo:` Generic repository meta changes, like README updates, or refactoring by moving files
4. `pr:` For maintainers only to merge PRs

## Code Style

Use Prettier to format TypeScript and SCSS files with provided editorconfig. Use best judgement on HTML files (since Prettier doesn't do well here). 

Each Angular route (/home, /inbox, etc) should have it's own directory in `src/app/` with routing module and component module. See existing routes for examples.

## Testing & Validation

If you are able to test code you've added locally, please do so. If you are unable, please make a note in your PR or issue.

Automated test cases are accepted but are currently not a part of the CI/CD pipeline (and so not required).