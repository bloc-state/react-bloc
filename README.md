# @bloc-state/bloc

![Codecov](https://badgen.net/npm/v/@bloc-state/react-bloc?color=black)
![Codecov](https://badgen.net/bundlephobia/minzip/@bloc-state/react-bloc?color=black)
![Codecov](https://badgen.net/codecov/c/github/bloc-state/react-bloc?color=black)
![Codecov](https://badgen.net/npm/license/@bloc-state/react-bloc?color=black)

## Introduction
React components and hooks for bloc-state

## Installation

</br>

```
npm install @bloc-state/react-bloc
```

## Components
</br>

### BlocProvider

```ts
const UserProvider = () => (
  <BlocProvider
    bloc={UserBloc}
    onCreate={(get) => get(UserBloc).add(new UserInitializedEvent())}
  >
    <SomeChildComponent />
  </BlocProvider>
)

// or if you need to add multiple blocs, pass an array of blocs, but you must provide a name for the provider

const UserProvider = () => (
  <BlocProvider
    bloc={[ UserBloc, UserLocationBloc ]}
    name="user-provider"
    onCreate={(get) => 
      get(UserLocationBloc).add(new UserLocationFetchingEvent())
      get(UserBloc).add(new UserInitializedEvent())
    }
  >
    <SomeChildComponent />
  </BlocProvider>
)

// onCreate's first argument is a callback function that gets passed a BlocResolver.
// This is useful for dispatching events before the Provider tree is rendered, very useful for render-as-you-fetch
```

### BlocListener

```ts
const UserBlocListener = () => {
  const history = useHistory()

  return (
    <BlocListener
      bloc={UserBloc}
      listenWhen={(get, state) => !state.isAuthenticated}
      listen={(get, state) => history.push("/login")}
    >
      <SomeChildComponent />
    </BlocListener>
  )
}

// or if you need to listen to multiple blocs

const UserBlocListener = () => {
  const history = useHistory()

  return (
    <BlocListener
      bloc={[ UserBloc, UserLocationBloc ]}

      listen={(get, state) => {
        history.push("/login")
      }}

      listenWhen={(get, state) => {
        return !state.isAuthenticated
      }}
    >
      <SomeChildComponent />
    </BlocListener>
  )

}
```

## Hooks

### useBlocInstance

```ts
export const SomeComponent = () => {
  const bloc = useBlocInstance(UserBloc) // returns the bloc instance from context

  return (
    <>
      <a onClick={() => bloc.add(new UserClickedEvent())}></a>
    </>
  )
}

```

### useBlocValue

```ts
export const SomeComponent = () => {
  const state = useBlocValue(UserBloc) // returns the current state value from a bloc instance

  return (
    <>
      <p>User: {state.name}</p>
    </>
  )
}

```

### useSetBloc

```ts
export const SomeComponent = () => {
  const emit = useSetValue(CounterCubit) // returns the emitter method from a bloc/cubit

  // should only be used with cubits, blocs use events to change state in a bloc

  return (
    <>
      <a onClick={() => emit((count) => count + 1) }></a>
    </>
  )
}

```

### useBlocSelector

```ts
export const SomeComponent = () => {
  const lastName = useBlocSelector(UserBloc, {
    selector: (state) => state.name.last,
    swr: true, // optional when suspense is enabled, stale-while-revalidate, allows a component to only suspend on intial load, future loading states will be ignored, defaults to false
    suspend: true // optional, defaults to true, if set to true components will suspend when loading states are emitted
  })

  return (
    <>
      <p>{lastName}</p>
    </>
  )
}
```

### useBloc

```ts
export const SomeComponent = () => {
  // returns a tuple with the state as first index and the bloc instance as second index
  // optionally takes a useBlocSelector config object, so it can be used to read as well as emit events with bloc intance
  const [state, bloc] = useBloc(UserBloc, {
    selector: (state) => state.name.last,
  }) 

  // should only be used with cubits, blocs use events to change state in a bloc
  return (
    <>
      <a onClick={() => emit((count) => count + 1) }></a>
    </>
  )
}

```