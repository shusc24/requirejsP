declare let requirejs:any,Promise:any,define:any,exports:any,module:any;
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        // 浏览器全局变量(root 即 window)
        root.requireP = factory();
    }
}(this, function () {
    const requireP= function (deps) {
        class AmdPromise {
            private DepsArr:any;
            private aliasArr:any;
            constructor() {
                this.DepsArr = [];
                this.aliasArr = [];
                if (Array.isArray(deps)) {
                    deps.forEach(dep => {
                        let depString = dep.split(":");
                        let depName = depString[0];
                        let aliasName = depString[1];
                        this.aliasArr.push(aliasName || depName);
                        this.DepsArr.push(this.$createAmd(depName));
                    });
                } else {
                    this.DepsArr.push(this.$createAmd(deps))
                }
            }
            then(fn) {
                Promise.all((() => {
                    return this.DepsArr.map(depFn => {
                        return depFn()
                    })
                })()).then(libs => {
                    if(Array.isArray(deps)){
                        let Obj = {};
                        deps.forEach((dep, index) => {
                            Obj[this.aliasArr[index]] = libs[index];
                        });
                        fn.call(null, Obj)
                    }else{
                        fn.apply(null, libs)
                    }
                });
                return this
            }
            $createAmd(lib) {
                return function () {
                    return new Promise(resolve => {
                        requirejs([lib], resolve)
                    })
                }
            }
        }
        return new AmdPromise()
    };
    return requireP;
}));
