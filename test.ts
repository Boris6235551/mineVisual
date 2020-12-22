// npx tsc test.ts
let str: string = 'ssssss';
//str = 1;
let num: number = 10;
//num = 'aaa';

let isTrue: boolean = true;

let unknown: any = '1';
unknown = 1;
unknown = true;

let unknown2: string | number | boolean = '1';
unknown2 = 1;
unknown2 = true;

let numArray1: number[] = [1, 2, 3];
let numArray2: Array<number> = [1, 2, 3];
let strArray1: string[] = ['a', 'b', 'c'];
let strArray2: Array<string> = ['a', 'b', 'c'];
let boolArray1: boolean[] = [true, false];
let boolArray2: Array<boolean> = [true, false];
let array2: any[] = [1, 'a', true];
// tuples
let array: [number, string] = [1, 'aa' ];
// function
function getMyName(age: number, prefix: string = 'www'): string {
     //return age.toString();
     return prefix + age;
}

let mySum: (num1: number, num2: number) =>number;
function sum(num1: number, num2: number): number {
    return num1 + num2;
}

mySum = sum;

let user: {name: string, age: number, logName: ()=>void, jobs: string[]} = {
    name: 'NNNN',
    age: 50,
    jobs: ['a', 'b'],
    logName(): void {
        console.log(this.name + this.age);
    }
};