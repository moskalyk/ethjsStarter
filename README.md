# Starter project for EthereumJS

This is an example Typescript project that uses `EthereumJS` packages as a submodule so it can be used on our latest branches/commits.

Use `npm i` to install the prepackaged deps (just Typescript and `tsx` for running scripts) and it will also install EthereumJS dependencies in a submodule.  In order to import them in this project, place your Typescript files in the `src` directory and import EthereumJS from `../ethereumjs-monorepo/[package]/dist/[cjs or esm (dependeing on if you're doing CommonJS or ESM)]`.

Then, you can run your scripts with `npx tsx src/index.ts`.

# Pick a different commit for `EthereumJS`

To pin EthereumJS to a different commit/branch, simply do the following:
1) `cd ethereumjs-monorepo`
2) `git fetch`
3) `git checkout [commit hash/branch name]`
4) `npm i`
