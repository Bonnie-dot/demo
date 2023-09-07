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

    it('should return value when call static resolve method given primitive value ', () => {
        MyPromise.resolve(2).then((value)=>{
            expect(value).toEqual(2);
        })
    });

    it('should return value when call static resolve method given a promise instance ', () => {
        MyPromise.resolve(()=>{
          return new MyPromise((resolve)=>{
              setTimeout(()=>{
                  resolve(5)
              })
          })
        }).then((value)=>{
            expect(value).toEqual(expect.any(Function));
        });
    });
})