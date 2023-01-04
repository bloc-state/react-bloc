# [4.2.0-beta.2](https://github.com/bloc-state/react-bloc/compare/v4.2.0-beta.1...v4.2.0-beta.2) (2023-01-04)


### Bug Fixes

* **BlocProvider:** change BlocRegistration type to accept BlocModule ([3a9cb3b](https://github.com/bloc-state/react-bloc/commit/3a9cb3b346a48a2901adb32fd591c06c1c7d5eab))

# [4.2.0-beta.1](https://github.com/bloc-state/react-bloc/compare/v4.1.1...v4.2.0-beta.1) (2023-01-04)


### Features

* **BlocProvider:** added container registration at the provider level ([ba64139](https://github.com/bloc-state/react-bloc/commit/ba641398b4570b68f1cc0219ca0823791da9e502))

## [4.1.1](https://github.com/bloc-state/react-bloc/compare/v4.1.0...v4.1.1) (2022-12-22)


### Bug Fixes

* **types:** bump @bloc-state/state @bloc-state/bloc to update types ([97b2faa](https://github.com/bloc-state/react-bloc/commit/97b2faaa5023ca96c3e5bd84a352c8067d011b8b))

# [4.1.0](https://github.com/bloc-state/react-bloc/compare/v4.0.0...v4.1.0) (2022-12-22)


### Features

* **useBlocSelector:** added errorWhen predicate option ([d632759](https://github.com/bloc-state/react-bloc/commit/d6327590ed4e89647945b7c9ba0cb64062737206))

# [4.0.0](https://github.com/bloc-state/react-bloc/compare/v3.1.0...v4.0.0) (2022-12-19)


### Bug Fixes

* **resolver:**  both BlocProvider and BlocListener use BlocResolver callback ([48d62f7](https://github.com/bloc-state/react-bloc/commit/48d62f781641b2893e17170cb02cf407125a7250))


### Features

* **useBlocSelector:** useBlocSelector no longer accepts suspend option ([f9b89fa](https://github.com/bloc-state/react-bloc/commit/f9b89fad550a8aa68b05e77ce9c050759eb24a3b))


### BREAKING CHANGES

* **useBlocSelector:** useBlocSelector no longer needs the suspend option,
only the suspendWhen callback will trigger suspense

# [3.1.0](https://github.com/bloc-state/react-bloc/compare/v3.0.0...v3.1.0) (2022-12-17)

### Bug Fixes

- **useBloc:** change useObservableState to useObservableEagerState ([b0298d9](https://github.com/bloc-state/react-bloc/commit/b0298d9cec45daf4103be5b8890ed13db5c8300c))
- **useBlocSelector:** fix suspendWhen logic ([7e8b330](https://github.com/bloc-state/react-bloc/commit/7e8b330b3a772bfb6708a41c8d87b51f222dfbf1))

### Features

- **BlocProvider:** added optional deps props ([49cf503](https://github.com/bloc-state/react-bloc/commit/49cf50385249528ebdc26a365ce3ece72ddb060c))

# [3.0.0](https://github.com/bloc-state/react-bloc/compare/v2.1.2...v3.0.0) (2022-12-14)

### Bug Fixes

- **bloc-listener:** use useLayoutEffect instead of useEffect ([b0c47ba](https://github.com/bloc-state/react-bloc/commit/b0c47bac1646837e8041d3c6b70dc8b765e36db0))
- **BlocListener:** removed MultiBlocListener ([6fb8b3d](https://github.com/bloc-state/react-bloc/commit/6fb8b3dd00272af77dd03c254d0d88d328206df3))
- **BlocProvider:** expose public registerModules method ([f122c8e](https://github.com/bloc-state/react-bloc/commit/f122c8e9a7022e9c828f8c12b734444c304560b0))
- **BlocProvider:** switch useLayoutEffect to useEffect ([b45458d](https://github.com/bloc-state/react-bloc/commit/b45458de9ca1d15dd97248f5d5a0d01ce9a07f7d))
- **deps:** add @bloc-state/state as peerDependency ([f3b20e9](https://github.com/bloc-state/react-bloc/commit/f3b20e90ae9b5aaf05da2e64ad7bf6e91258ac38))
- **state-resource:** removed state resource feature ([b2c9f16](https://github.com/bloc-state/react-bloc/commit/b2c9f16983b89bfab4dc70d8f638048f3864d190))
- **useBlocSelector:** update suspendWhen predicate ([d603188](https://github.com/bloc-state/react-bloc/commit/d603188e8142b1923015386e2d7d8ee29b0c2fdd))

- Beta (#6) ([343dd27](https://github.com/bloc-state/react-bloc/commit/343dd27c0a2db1ff6e3f4f3fa23bf0d87d4e4d13)), closes [#6](https://github.com/bloc-state/react-bloc/issues/6)

### Features

- **context:** expose context containers in blocContext ([b588824](https://github.com/bloc-state/react-bloc/commit/b588824a974fd91f2adce5380371d017622fd74b))
- switched to Awilix from Tsyringe for IoC ([51fd480](https://github.com/bloc-state/react-bloc/commit/51fd480e9fc28fa82683dfeece7852a77ca32589))

### BREAKING CHANGES

- removing StateResource in favor of ObservableResource
  from observable-hooks library

- chore(release): set `package.json` to 3.0.0-beta.1 [skip ci]

# [3.0.0-beta.1](https://github.com/bloc-state/react-bloc/compare/v2.1.1...v3.0.0-beta.1) (2022-11-25)

### Bug Fixes

- **BlocListener:** fix imports for BlocListener ([8080c27](https://github.com/bloc-state/react-bloc/commit/8080c2726ec3fdb91e3bee30820fa1b20646f42b))
- **state-resource:** removed state resource feature ([b2c9f16](https://github.com/bloc-state/react-bloc/commit/b2c9f16983b89bfab4dc70d8f638048f3864d190))

### BREAKING CHANGES

- **state-resource:** removing StateResource in favor of ObservableResource
  from observable-hooks library

- fix(bloc-listener): use useLayoutEffect instead of useEffect

- chore(release): set `package.json` to 3.0.0-beta.2 [skip ci]

# [3.0.0-beta.2](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2022-11-25)

### Bug Fixes

- **bloc-listener:** use useLayoutEffect instead of useEffect ([b0c47ba](https://github.com/bloc-state/react-bloc/commit/b0c47bac1646837e8041d3c6b70dc8b765e36db0))

- feat(context): expose context containers in blocContext

When creating a blocContext, currently we are storing only the container
inside the context itself. The blocContextMap should have both the
context as well as the container inside the map, this way BlocListeners
and any external services have access to any blocs that currently
exists in react context.

- chore(release): set `package.json` to 3.0.0-beta.3 [skip ci]

# [3.0.0-beta.3](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2022-11-26)

### Features

- **context:** expose context containers in blocContext ([b588824](https://github.com/bloc-state/react-bloc/commit/b588824a974fd91f2adce5380371d017622fd74b))

- feat: switched to Awilix from Tsyringe for IoC

- chore(release): set `package.json` to 3.0.0-beta.4 [skip ci]

# [3.0.0-beta.4](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2022-12-11)

### Features

- switched to Awilix from Tsyringe for IoC ([51fd480](https://github.com/bloc-state/react-bloc/commit/51fd480e9fc28fa82683dfeece7852a77ca32589))

- fix(BlocListener): removed MultiBlocListener

- chore(release): set `package.json` to 3.0.0-beta.5 [skip ci]

# [3.0.0-beta.5](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2022-12-12)

### Bug Fixes

- **BlocListener:** removed MultiBlocListener ([6fb8b3d](https://github.com/bloc-state/react-bloc/commit/6fb8b3dd00272af77dd03c254d0d88d328206df3))

- fix(BlocProvider): switch useLayoutEffect to useEffect

- fix(BlocProvider): expose public registerModules method

- chore(release): set `package.json` to 3.0.0-beta.6 [skip ci]

# [3.0.0-beta.6](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.5...v3.0.0-beta.6) (2022-12-12)

### Bug Fixes

- **BlocProvider:** expose public registerModules method ([f122c8e](https://github.com/bloc-state/react-bloc/commit/f122c8e9a7022e9c828f8c12b734444c304560b0))
- **BlocProvider:** switch useLayoutEffect to useEffect ([b45458d](https://github.com/bloc-state/react-bloc/commit/b45458de9ca1d15dd97248f5d5a0d01ce9a07f7d))

- fix(deps): add @bloc-state/state as peerDependency

- chore(release): set `package.json` to 3.0.0-beta.7 [skip ci]

# [3.0.0-beta.7](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.6...v3.0.0-beta.7) (2022-12-13)

### Bug Fixes

- **deps:** add @bloc-state/state as peerDependency ([f3b20e9](https://github.com/bloc-state/react-bloc/commit/f3b20e90ae9b5aaf05da2e64ad7bf6e91258ac38))

- fix(useBlocSelector): update suspendWhen predicate

- docs(ci): added codecov to ci

- docs(readme): updated readme to reflect api changes

- chore(release): set `package.json` to 3.0.0-beta.8 [skip ci]

# [3.0.0-beta.8](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.7...v3.0.0-beta.8) (2022-12-14)

### Bug Fixes

- **useBlocSelector:** update suspendWhen predicate ([d603188](https://github.com/bloc-state/react-bloc/commit/d603188e8142b1923015386e2d7d8ee29b0c2fdd))

- refactor(useSetValue): changed method name to useBlocSetValue

- docs(readme): updated BlocListener docs

- build(package.json): removed unwanted character

Co-authored-by: semantic-release-bot <semantic-release-bot@martynus.net>

- **state-resource:** removing StateResource in favor of ObservableResource
  from observable-hooks library

# [3.0.0-beta.8](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.7...v3.0.0-beta.8) (2022-12-14)

### Bug Fixes

- **useBlocSelector:** update suspendWhen predicate ([d603188](https://github.com/bloc-state/react-bloc/commit/d603188e8142b1923015386e2d7d8ee29b0c2fdd))

# [3.0.0-beta.7](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.6...v3.0.0-beta.7) (2022-12-13)

### Bug Fixes

- **deps:** add @bloc-state/state as peerDependency ([f3b20e9](https://github.com/bloc-state/react-bloc/commit/f3b20e90ae9b5aaf05da2e64ad7bf6e91258ac38))

# [3.0.0-beta.6](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.5...v3.0.0-beta.6) (2022-12-12)

### Bug Fixes

- **BlocProvider:** expose public registerModules method ([f122c8e](https://github.com/bloc-state/react-bloc/commit/f122c8e9a7022e9c828f8c12b734444c304560b0))
- **BlocProvider:** switch useLayoutEffect to useEffect ([b45458d](https://github.com/bloc-state/react-bloc/commit/b45458de9ca1d15dd97248f5d5a0d01ce9a07f7d))

# [3.0.0-beta.5](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2022-12-12)

### Bug Fixes

- **BlocListener:** removed MultiBlocListener ([6fb8b3d](https://github.com/bloc-state/react-bloc/commit/6fb8b3dd00272af77dd03c254d0d88d328206df3))

# [3.0.0-beta.4](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2022-12-11)

### Features

- switched to Awilix from Tsyringe for IoC ([51fd480](https://github.com/bloc-state/react-bloc/commit/51fd480e9fc28fa82683dfeece7852a77ca32589))

# [3.0.0-beta.3](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2022-11-26)

### Features

- **context:** expose context containers in blocContext ([b588824](https://github.com/bloc-state/react-bloc/commit/b588824a974fd91f2adce5380371d017622fd74b))

# [3.0.0-beta.2](https://github.com/bloc-state/react-bloc/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2022-11-25)

### Bug Fixes

- **bloc-listener:** use useLayoutEffect instead of useEffect ([b0c47ba](https://github.com/bloc-state/react-bloc/commit/b0c47bac1646837e8041d3c6b70dc8b765e36db0))

# [3.0.0-beta.1](https://github.com/bloc-state/react-bloc/compare/v2.1.1...v3.0.0-beta.1) (2022-11-25)

### Bug Fixes

- **BlocListener:** fix imports for BlocListener ([8080c27](https://github.com/bloc-state/react-bloc/commit/8080c2726ec3fdb91e3bee30820fa1b20646f42b))

- **state-resource:** removed state resource feature ([b2c9f16](https://github.com/bloc-state/react-bloc/commit/b2c9f16983b89bfab4dc70d8f638048f3864d190))

### BREAKING CHANGES

- **state-resource:** removing StateResource in favor of ObservableResource
  from observable-hooks library
  s

## [2.1.1](https://github.com/bloc-state/react-bloc/compare/v2.1.0...v2.1.1) (2022-11-24)

### Bug Fixes

- **readme:** updated readme, bump to push changes to npm ([14b80a7](https://github.com/bloc-state/react-bloc/commit/14b80a7a5e91d9fbf1da1480c5b471ce2060705e))

# [2.1.0](https://github.com/bloc-state/react-bloc/compare/v2.0.0...v2.1.0) (2022-11-24)

### Features

- **bloc-listener:** added BlocListener component ([b9d8bad](https://github.com/bloc-state/react-bloc/commit/b9d8bad52b08ab078dd503f4459a8d25ed606a59))

# [2.0.0](https://github.com/bloc-state/react-bloc/compare/v1.0.1...v2.0.0) (2022-11-22)

### Features

- catch up to to 2.0.0 release on npm ([8fc35eb](https://github.com/bloc-state/react-bloc/commit/8fc35eb0d107c8166a549089109078e50646cb62))

### BREAKING CHANGES

- catch up to 2.0.0 release on npm

# [2.0.0-beta.4](https://github.com/bloc-state/react-bloc/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2022-11-22)

### Bug Fixes

- **package:** changed package name from react_bloc to react-bloc ([ee255ea](https://github.com/bloc-state/react-bloc/commit/ee255ea53b35f804b6bb57c23daa13f712f9442b))
- **semantic-release:** fix semantic release versioning for npm publishing ([e802061](https://github.com/bloc-state/react-bloc/commit/e8020616deba0ed050f8e6838cd979d23a8efd2a))

# [2.0.0-beta.3](https://github.com/bloc-state/react_bloc/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-11-22)

### Bug Fixes

- **state-resource:** stale while revalidate logic ([b79497c](https://github.com/bloc-state/react_bloc/commit/b79497ce859dae3d85617524186d95a60db188a5))

### Features

- **useBlocSelector:** added listenWhen and swr options ([a045e3a](https://github.com/bloc-state/react_bloc/commit/a045e3aab0b8f35169bf4a4b508b065560b1493e))

# [2.0.0-beta.2](https://github.com/bloc-state/react-bloc/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-11-20)

### Features

- update dependencies with some breaking changes ([fb73304](https://github.com/bloc-state/react-bloc/commit/fb73304fccda0d51619d189f0bed8f811f07f404))

# [2.0.0-beta.1](https://github.com/bloc-state/react-bloc/compare/v1.0.0...v2.0.0-beta.1) (2022-11-18)

### Features

- integrate with bloc-state/bloc 2.0 api ([2813ffb](https://github.com/bloc-state/react-bloc/commit/2813ffbfbf7727dd8d7cebddcf01d186dad46de5))

### BREAKING CHANGES

- @bloc-state/bloc has a new api that conforms with the
  felangel/bloc 8.0 api dart package. Changes have been made to reflect
  that.

# 1.0.0-beta.1 (2022-11-17)

### Features

- initial commit ([9920242](https://github.com/bloc-state/react-bloc/commit/9920242b9e7a396fd7d5d9e58fd62cbfe6d2a75b))
- integrate with bloc-state/bloc 2.0 api ([2813ffb](https://github.com/bloc-state/react-bloc/commit/2813ffbfbf7727dd8d7cebddcf01d186dad46de5))

### BREAKING CHANGES

- @bloc-state/bloc has a new api that conforms with the
  felangel/bloc 8.0 api dart package. Changes have been made to reflect
  that.

# [2.1.0](https://github.com/bloc-state/react/compare/v2.0.0...v2.1.0) (2022-11-15)

### Features

- initial commit ([8c1d32c](https://github.com/bloc-state/react/commit/8c1d32c8d12041aab217d6cfba512f0ec1ef7522))
