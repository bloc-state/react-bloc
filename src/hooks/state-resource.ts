import { Observable, Subscription } from "rxjs"
import { State } from "@bloc-state/state"

interface Handler<T = any> {
  suspender: Promise<T>
  resolve: (value?: T) => void
}

export enum StateResourceStatus {
  "loading",
  "ready",
  "error",
}

export class StateResource<S extends State> {
  constructor(
    state$: Observable<S>,
    updater: (status: StateResourceStatus) => void = () => {},
    swr: boolean = false,
  ) {
    this.#state$ = state$

    this.#update = updater

    this.#swr = swr

    this.#resourceHandler = this.#getHandler()

    this.#subscription = this.#subscribeToState()

    this.read = this.read.bind(this)

    this.close = this.close.bind(this)
  }

  #swr: boolean

  #isClosed = false

  #subscription: Subscription

  #readyState: State | null = null

  #error: Error | null = null

  #state$: Observable<State>

  #status: StateResourceStatus = StateResourceStatus.loading

  #resourceHandler: Handler

  #update: (status: StateResourceStatus) => void

  #handleLoading(state: State) {
    if (this.#swr) {
      return
    }

    if (this.#status === StateResourceStatus.loading) {
      return
    }

    this.#status = StateResourceStatus.loading
    this.#update(this.#status)
  }

  #handleReady(state: State) {
    const isLoading = this.#status === StateResourceStatus.loading

    this.#readyState = state
    this.#status = StateResourceStatus.ready

    if (isLoading) {
      const { resolve } = this.#resourceHandler
      this.#resourceHandler = this.#getHandler()
      resolve()
    }

    this.#update(this.#status)
  }

  #handleError(error: Error) {
    const isLoading = this.#status === StateResourceStatus.loading

    this.#error = error
    this.#status = StateResourceStatus.error

    if (isLoading) {
      const { resolve } = this.#resourceHandler
      this.#resourceHandler = this.#getHandler()
      resolve()
    }

    this.#update(this.#status)
  }

  #handleNext = (state: State): void => {
    const status = state.status

    this.#readyState = this.#swr ? state.ready() : null
    this.#error = null

    if (state.error) {
      this.#handleError(state.error)
    }

    if (status === "ready" || status === "initial") {
      this.#handleReady(state)
    }

    if (status === "loading") {
      this.#handleLoading(state)
    }
  }

  #subscribeToState() {
    return this.#state$.subscribe({
      next: this.#handleNext,
    })
  }

  #getHandler(): Handler {
    const handler: Partial<Handler> = {}
    handler.suspender = new Promise((resolve) => {
      handler.resolve = resolve
    })
    return handler as Handler
  }

  get isClosed() {
    return this.#isClosed
  }

  get status() {
    return this.#status
  }

  read() {
    switch (this.#status) {
      case StateResourceStatus.error:
        throw this.#error
      case StateResourceStatus.loading:
        throw this.#resourceHandler.suspender
      default:
        return this.#readyState!
    }
  }

  close() {
    this.#isClosed = true
    this.#subscription.unsubscribe()
  }
}
