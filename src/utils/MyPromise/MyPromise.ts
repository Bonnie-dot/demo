type State = 'PENDING' | 'FULFILLED' | 'REJECTED'
type Handler = (resolve: (value: unknown) => void, reject: (value: unknown) => void) => void;
const isFunction = (fn: unknown): fn is (arg?: unknown) => unknown => typeof fn === "function";

interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}

interface PromiseRejectedResult {
    status: "rejected";
    reason: any;
}

class MyPromise<T> {
    _state: State;
    _value: T;
    _reason: unknown;
    _onResolveCallbacks: Function[];
    _onRejectCallbacks: Function[];

    constructor(handler: Handler) {
        this._state = "PENDING";
        this._value = undefined;
        this._onRejectCallbacks = [];
        this._onResolveCallbacks = [];
        handler(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(value: T) {
        if (this._state !== "PENDING") return;
        queueMicrotask(() => {
            this._state = "FULFILLED";
            this._value = value;
            let callback;
            while (callback = this._onResolveCallbacks.shift()) {
                callback(value);
            }
        })
    }

    _reject(value: unknown) {
        if (this._state !== "PENDING") return;
        queueMicrotask(() => {
            this._state = "REJECTED";
            this._reason = value;
            let callback;
            while (callback = this._onRejectCallbacks.shift()) {
                callback(value);
            }
        })
    }

    then(onfulfilled?: (value: T) => unknown, onRejected?: (value: T) => unknown): MyPromise<T> {
        return new MyPromise((resolve, reject) => {
            const onResolve = (fn: (value: T) => unknown) => {
                if (!isFunction(fn)) {
                    resolve(this._value);
                } else {
                    try {
                        const result = fn(this._value);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result);
                        }
                    } catch (e) {
                        reject(e);
                    }

                }

            }
            const onReject = (fn: (value: T) => unknown) => {
                if (!isFunction(fn)) {
                    reject(this._value);
                } else {
                    try {
                        const result = fn(this._value);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject)
                        } else {
                            reject(result);
                        }
                    } catch (e) {
                        reject(e);
                    }

                }
            }
            switch (this._state) {
                case "PENDING":
                    this._onResolveCallbacks.push(onfulfilled);
                    this._onRejectCallbacks.push(onRejected);
                    break;
                case "FULFILLED":
                    onResolve(onfulfilled);
                    break;
                case "REJECTED":
                    onReject(onRejected);
                    break;
            }
        })

    }

    catch(onRejected?: (value: T) => unknown): MyPromise<T> {
        return this.then(undefined, onRejected);
    }

    /*
    * @param {unknown} value - if the value function, it will return from then callback and not execute
    *
    */
    static resolve(value: unknown) {
        if (value instanceof MyPromise) {
            return value;
        } else {
            return new MyPromise((resolve) => resolve(value));
        }
    }

    static reject(value: unknown) {
        if (value instanceof MyPromise) {
            return value;
        } else {
            return new MyPromise((undefined, reject) => reject(value));
        }
    }

    /*
    *  If even a single promise in the input array rejects, the entire Promise.all operation will fail, and you won't get any of the resolved values.
    *  This behavior is suitable when you want all promises to succeed, and if any of them fail, you want to handle the error immediately.
    * */
    static all(values: unknown[]) {
        return new MyPromise((resolve, reject) => {
            let results: unknown[] = [];
            for (let i = 0; i < values.length; i++) {
                MyPromise.resolve(values[i])
                    .then((value) => {
                        results.push(value)
                        if (results.length === values.length) {
                            resolve(results)
                        }
                    }, (value) => {
                        reject(value);
                    });
            }
        })
    }
    /*
    * Waits for all the input promises to settle (either resolve or reject), and it doesn't fail the entire operation if some promises reject
    * Run multiple asynchronous tasks in parallel, and you're interested in knowing the outcome of each task
    * */
    static allSettled(values: unknown[]) {
        return new MyPromise((resolve, reject) => {
            const results: unknown[] = [];
            const onFinalCallback = (value: MyPromise<unknown>,state:State,fn: Function) => {
                results.push({status: state, value: value});
                if (results.length === values.length) {
                    fn(results);
                }
            }
            for (let i = 0; i < values.length; i++) {
                MyPromise.resolve(values[i])
                    .then((value) => {
                        onFinalCallback(value, "FULFILLED", resolve)}, (value) => onFinalCallback(value,"REJECTED", reject));
            }
        })
    }

}

export default MyPromise