type State = 'PENDING' | 'FULFILLED' | 'REJECTED'
type Handler = (resolve: (value: unknown) => void, reject: (value: unknown) => void) => void;
const isFunction = (fn: unknown): fn is (arg?:unknown) => unknown => typeof fn === "function";

class MyPromise<T> {
    _state: State;
    _value: T;
    _reason: unknown;
    _onResolveCallbacks: Function[] = [];
    _onRejectCallbacks: Function[] = [];

    constructor(handler: Handler) {
        this._state = "PENDING";
        this._value = undefined;
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

    static resolve(value: unknown) {
        if (value instanceof MyPromise){
            return value;
        }else {
            return new MyPromise((resolve)=>resolve(value));
        }
    }
}

export default MyPromise