import "reflect-metadata"
import { CounterState } from "../test-helpers"
import { BehaviorSubject, shareReplay } from "rxjs"
import {
  StateResource,
  StateResourceStatus,
} from "../../src/hooks/state-resource"

describe("StateResource", () => {
  describe("StateResource.read", () => {
    let resource: StateResource<CounterState>
    const updater = jest.fn()
    afterEach(() => {
      resource.close()
    })

    it("should unsubscribe to observable resource when closed", () => {
      expect.assertions(3)
      const state = new CounterState(2)
      const subject$ = new BehaviorSubject<CounterState>(state)
      const state$ = subject$
        .asObservable()
        .pipe(shareReplay({ refCount: true, bufferSize: 1 }))

      resource = new StateResource(state$)

      expect(resource.read().data).toBe(2)

      resource.close()

      subject$.next(state.ready(3))

      expect(resource.read().data).toBe(2)
      expect(resource.isClosed).toBe(true)
    })

    it("should throw promise for loading state", () => {
      expect.assertions(4)

      const state = new CounterState(0).loading()
      const subject$ = new BehaviorSubject<CounterState>(state)
      const state$ = subject$.asObservable()

      resource = new StateResource(state$)

      expect(resource.read).toThrowError(Promise)
      expect(resource.status).toBe(StateResourceStatus.loading)

      subject$.next(state.ready(10))

      expect(resource.read().data).toBe(10)

      subject$.next(state.loading())

      expect(resource.status).toBe(StateResourceStatus.loading)
    })

    it("should throw error for error state", () => {
      expect.assertions(2)
      const state = new CounterState(0).loading()
      const subject$ = new BehaviorSubject<CounterState>(state)
      const state$ = subject$.asObservable()
      const resource = new StateResource(state$, updater)

      subject$.next(state.failed(new Error("failure from state resource")))
      expect(resource.read).toThrow("failure from state resource")
      expect(updater).toHaveBeenCalledTimes(1)
    })

    it("should return value for ready state", () => {
      expect.assertions(2)
      const state = new CounterState(0).loading()
      const subject$ = new BehaviorSubject<CounterState>(state)
      const state$ = subject$.asObservable()
      const resource = new StateResource(state$, updater)

      subject$.next(state.ready(10))
      expect(resource.read().data).toBe(10)
      expect(updater).toBeCalledTimes(2)
    })

    it("should handle stale while revalidate", () => {
      expect.assertions(12)
      let state = new CounterState(0).loading()
      const subject$ = new BehaviorSubject<CounterState>(state)
      const state$ = subject$.asObservable()
      const resource = new StateResource(state$, updater, true)

      expect(resource.read).toThrowError(Promise)
      expect(resource.status).toBe(StateResourceStatus.loading)

      state = state.ready(10)
      subject$.next(state)
      const result = resource.read()
      expect(result.data).toBe(10)
      expect(result.status).toBe("ready")
      expect(resource.status).toBe(StateResourceStatus.ready)

      state = state.loading()
      subject$.next(state)
      const result2 = resource.read()
      expect(result2.status).toBe("ready")
      expect(result2.data).toBe(10)
      expect(resource.status).toBe(StateResourceStatus.ready)

      state = state.ready(11)
      subject$.next(state)
      const result3 = resource.read()
      expect(result3.status).toBe("ready")
      expect(result3.data).toBe(11)
      expect(resource.status).toBe(StateResourceStatus.ready)

      expect(updater).toBeCalledTimes(4)

    })
  })
})
