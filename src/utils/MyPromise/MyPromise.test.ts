import MyPromise from "./MyPromise";

describe("MyPromise", () => {

    it('should return value when call then method given resolve', () => {
        new MyPromise((resolve) => {
            resolve(2);
        }).then((value) => {
            expect(value).toEqual(2);
        })
    });

    it('should return value when call then method given reject', () => {
        new MyPromise((resolve, reject) => {
            reject(2);
        }).then((value) => {
            expect(value).toEqual(2);
        })
    });

    it('should return value when call catch method given reject', () => {
        new MyPromise((resolve, reject) => {
            reject(4);
        }).catch((value) => {
            expect(value).toEqual(4);
        })
    });

    it('should return value when call finally method given reject', () => {
        new MyPromise((resolve, reject) => {
            reject(4);
        }).finally((value) => {
            expect(value).toEqual(4);
        })
    });

    it('should return value when call finally method given resolve', () => {
        new MyPromise((resolve) => {
            resolve(4);
        }).finally((value) => {
            expect(value).toEqual(4);
        })
    });

    it('should return value when call static resolve method given primitive value ', () => {
        MyPromise.resolve(2).then((value) => {
            expect(value).toEqual(2);
        })
    });

    it('should return value when call static resolve method given a promise instance ', () => {
        MyPromise.resolve(() => {
            return new MyPromise((resolve) => {
                setTimeout(() => {
                    resolve(5)
                })
            })
        }).then((value) => {
            expect(value).toEqual(expect.any(Function));
        });
    });

    it('should return value when call static reject method given primitive value ', () => {
        MyPromise.reject(2).then(undefined, (value) => {
            expect(value).toEqual(2);
        })
    });

    it('should return values when call static all method given all resolve values', () => {
        MyPromise.all([MyPromise.resolve(1), MyPromise.resolve(1), MyPromise.resolve(1)])
            .then((values) => {
                expect(values).toEqual([1, 1, 1])
            })
    });

    it('should return value when call static all method given different state promises', () => {
        MyPromise.all([MyPromise.resolve(1), MyPromise.reject(5), MyPromise.resolve(1)])
            .then(undefined, (value) => {
                expect(value).toEqual(5)
            })
    });

    it('should return value when call static allSettled method given different state promises', () => {
        MyPromise.allSettled([MyPromise.resolve(1), MyPromise.reject(5), MyPromise.resolve(1)])
            .then((value) => {
                expect(value).toEqual([{"status": "FULFILLED", "value": 1}, {
                    "status": "REJECTED",
                    "value": 5
                }, {"status": "FULFILLED", "value": 1}])
            })
    });

    it('should return value when call static any method given different state promises', () => {
        MyPromise.any([MyPromise.resolve(1), MyPromise.reject(5), MyPromise.resolve(1)])
            .then((value) => {
                expect(value).toEqual(1)
            })
    });

    it('should return value when call static any method given all reject promises', () => {
        MyPromise.any([MyPromise.reject(1), MyPromise.reject(5), MyPromise.reject(1)])
            .then(undefined, (value) => {
                expect(value).toEqual([1, 5, 1])
            })
    });

    it('should return value when call static race method given first reject promises', () => {
        MyPromise.race([MyPromise.reject(1), MyPromise.reject(5), MyPromise.reject(1)])
            .then(undefined, (value) => {
                expect(value).toEqual(1)
            })
    });
    it('should return value when call static race method given first resolve promises', () => {
        MyPromise.race([MyPromise.resolve(1), MyPromise.reject(5), MyPromise.reject(1)])
            .then((value) => {
                expect(value).toEqual(1)
            })
    });
})