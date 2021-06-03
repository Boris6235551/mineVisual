// npx tsc test.ts
var str = 'ssssss';
//str = 1;
var num = 10;
//num = 'aaa';
var isTrue = true;
var unknown = '1';
unknown = 1;
unknown = true;
var unknown2 = '1';
unknown2 = 1;
unknown2 = true;
var numArray1 = [1, 2, 3];
var numArray2 = [1, 2, 3];
var strArray1 = ['a', 'b', 'c'];
var strArray2 = ['a', 'b', 'c'];
var boolArray1 = [true, false];
var boolArray2 = [true, false];
var array2 = [1, 'a', true];
// tuples
var array = [1, 'aa'];
// function
function getMyName(age, prefix) {
    if (prefix === void 0) { prefix = 'www'; }
    //return age.toString();
    return prefix + age;
}
var mySum;
function sum(num1, num2) {
    return num1 + num2;
}
mySum = sum;
var user = {
    name: 'NNNN',
    age: 50,
    jobs: ['a', 'b'],
    logName: function () {
        console.log(this.name + this.age);
    }
};
var User2 = /** @class */ (function () {
    function User2(name, job) {
        this.name = name;
        this.job = job;
    }
    User2.prototype.getName = function () {
        return this.name;
    };
    return User2;
}());
//# sourceMappingURL=test.js.map