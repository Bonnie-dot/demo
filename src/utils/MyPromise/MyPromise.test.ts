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
})