type State = 'PENDING' | 'FULFILLED' | 'REJECTED'
type Handler = (
    resolve: (value: unknown) => void,
    reject: (value: unknown) => void
) => void
type FunctionArray = Array<(args: unknown) => unknown>

const isFunction = (fn: unknown): fn is (arg?: unknown) => unknown =>
    typeof fn === 'function'

class MyPromise<T> {
    _state: State
    _value: T
    _reason: unknown
    _onResolveCallbacks: FunctionArray
    _onRejectCallbacks: FunctionArray

    constructor(handler: Handler) {
        this._state = 'PENDING'
        this._value = undefined
        this._onRejectCallbacks = []
        this._onResolveCallbacks = []
        handler(this._resolve.bind(this), this._reject.bind(this))
    }

    _resolve(value: T) {
        if (this._state !== 'PENDING') return
        queueMicrotask(() => {
            this._state = 'FULFILLED'
            this._value = value
            let callback = this._onResolveCallbacks.shift()
            while (callback) {
                callback(value)
                callback = this._onResolveCallbacks.shift()
            }
        })
    }

    _reject(value: unknown) {
        if (this._state !== 'PENDING') return
        queueMicrotask(() => {
            this._state = 'REJECTED'
            this._reason = value
            let callback = this._onRejectCallbacks.shift()
            while (callback) {
                callback(value)
                callback = this._onRejectCallbacks.shift()
            }
        })
    }

    then(
        onfulfilled?: (value: T) => unknown,
        onRejected?: (value: T) => unknown
    ): MyPromise<T> {
        return new MyPromise((resolve, reject) => {
            const onResolve = (fn: (value: T) => unknown) => {
                if (!isFunction(fn)) {
                    resolve(this._value)
                } else {
                    try {
                        const result = fn(this._value)
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                    } catch (e) {
                        reject(e)
                    }
                }
            }
            const onReject = (fn: (value: T) => unknown) => {
                if (!isFunction(fn)) {
                    reject(this._value)
                } else {
                    try {
                        const result = fn(this._value)
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject)
                        } else {
                            reject(result)
                        }
                    } catch (e) {
                        reject(e)
                    }
                }
            }
            switch (this._state) {
                case 'PENDING':
                    this._onResolveCallbacks.push(onfulfilled)
                    this._onRejectCallbacks.push(onRejected)
                    break
                case 'FULFILLED':
                    onResolve(onfulfilled)
                    break
                case 'REJECTED':
                    onReject(onRejected)
                    break
            }
        })
    }

    catch(onRejected?: (value: T) => unknown): MyPromise<T> {
        return this.then(undefined, onRejected)
    }

    finally(onFinally: (value: unknown) => void) {
        this.then(
            (value) => onFinally(value),
            (error) => onFinally(error)
        )
    }

    /*
     * @param {unknown} value - if the value function, it will return from then callback and not execute
     *
     */
    static resolve(value: unknown) {
        if (value instanceof MyPromise) {
            return value
        } else {
            return new MyPromise((resolve) => resolve(value))
        }
    }

    static reject(value: unknown) {
        if (value instanceof MyPromise) {
            return value
        } else {
            return new MyPromise((_, reject) => reject(value))
        }
    }

    /*
     *  If even a single promise in the input array rejects, the entire Promise.all operation will fail, and you won't get any of the resolved values.
     *  This behavior is suitable when you want all promises to succeed, and if any of them fail, you want to handle the error immediately.
     */
    static all(values: unknown[]) {
        return new MyPromise((resolve, reject) => {
            const results: unknown[] = []
            for (let i = 0; i < values.length; i++) {
                MyPromise.resolve(values[i]).then(
                    (value) => {
                        results.push(value)
                        if (results.length === values.length) {
                            resolve(results)
                        }
                    },
                    (error) => {
                        reject(error)
                    }
                )
            }
        })
    }

    /*
     * Waits for all the input promises to settle (either resolve or reject), and it doesn't fail the entire operation if some promises reject
     * Run multiple asynchronous tasks in parallel, and you're interested in knowing the outcome of each task
     */
    static allSettled(values: unknown[]) {
        return new MyPromise((resolve, reject) => {
            const results: unknown[] = []
            const onFinalCallback = (
                value: MyPromise<unknown>,
                state: State,
                fn: (arg: Array<unknown>) => unknown
            ) => {
                results.push({ status: state, value: value })
                if (results.length === values.length) {
                    fn(results)
                }
            }
            for (let i = 0; i < values.length; i++) {
                MyPromise.resolve(values[i]).then(
                    (value) => {
                        onFinalCallback(value, 'FULFILLED', resolve)
                    },
                    (error) => onFinalCallback(error, 'REJECTED', reject)
                )
            }
        })
    }

    /*
     * This new promise will resolve with the value of the first promise in the input array that successfully resolves. If all promises in the input array reject, the returned promise will reject with an AggregateError that contains all the rejection reasons.
     *
     */
    static any(values: unknown[]) {
        return new MyPromise((resolve, reject) => {
            const errors: unknown[] = []
            for (let i = 0; i < values.length; i++) {
                MyPromise.resolve(values[i]).then(
                    (value) => resolve(value),
                    (error) => {
                        errors.push(error)
                        if (errors.length === values.length) {
                            reject(errors)
                        }
                    }
                )
            }
        })
    }

    /*
     * wait for the first promise in an array to settle (either resolve or reject)
     *
     */
    static race(values: unknown[]) {
        return new MyPromise((resolve, reject) => {
            let value = values.shift()
            while (value) {
                MyPromise.resolve(value).then(
                    (value) => resolve(value),
                    (error) => reject(error)
                )
                value = values.shift()
            }
        })
    }
}

export default MyPromise
