import Konva from 'konva';
import {BaseMineDraw, Scheme, Disposition, Point} from './mine_drawing';

const DeltaPoint = 20;
const StdQuantity = 4;

interface TubeSetup {
    quantity: number,
    atomSize: number,
    flow: boolean,
    length: number,
    p0: Point,
    disposition: Disposition
}
export class Tube extends BaseMineDraw{
    private quantity: number = 4;
    private atomSize: number = 5;
    private flow: boolean = true;
    private length: number;
    private periodLength: number;       // full periods length
    /*periods struct*/
    private fullPeriodsCount: number;
    private lastShort: boolean = false;
    private quantityInShort: number;
    private shortAtomSize: number;
    
    private periodsCount: number;
    private lastAtomsQuantity: number;
    constructor(setup: TubeSetup){
        super(setup.p0, setup.length, setup.disposition);
        this.quantity = setup.quantity;
        this.atomSize = setup.atomSize;
        this.flow = setup.flow;
        this.length = setup.length;
        this.periodLength = this.atomSize * this.quantity;
        this.calcPoints();
        this.primitives.push(new Konva.Rect({
            x: this.rect.p0.x, y: this.rect.p0.y, fill: '#1D8EEA',
            height: this.disposition==Disposition.Horizontal ? this.atomSize : this.length, 
            width:  this.disposition==Disposition.Horizontal ? this.length : this.atomSize
        }));
        this.periodsConfig();
        this.createPeriods();
    }
    private calcPoints(): void{
        let halfAtomSize = Math.trunc(this.atomSize/2);
        if(this.disposition == Disposition.Horizontal){
            this.rect.p0.y = this.rect.p0.y - halfAtomSize;
            this.rect.p1.y = this.rect.p0.y + this.atomSize; 
        }
        else {/* Distopsition.Vertical */
            this.rect.p0.x = this.rect.p0.x - halfAtomSize;
            this.rect.p1.x = this.rect.p0.x + this.atomSize; 
        } 
    }
    private getLastAtomsQuantity(length: number): number{
        let count = length / this.atomSize;

        return count;
    }
    private periodsConfig(): void{
        let periodsCount = this.length / this.periodLength; 
        let fullPeriodsCount = Math.trunc(periodsCount);
        let remainPeriodLength = this.length - periodsCount * this.periodLength;
        this.periodsCount = fullPeriodsCount;
        if(remainPeriodLength > 0){
            this.periodsCount = fullPeriodsCount + 1;
            this.lastShort = true;
            this.lastAtomsQuantity = this.getLastAtomsQuantity(remainPeriodLength); 

        }

    }
    private createPeriods(): void {
        let firstX: number = this.rect.p0.x;
        let firstY: number = this.rect.p0.y;
        let stepX = 0; let stepY = 0;
        let step = this.flow ? this.periodsCount : -this.periodsCount;
        if(this.disposition==Disposition.Horizontal){
            firstX = this.flow ? firstX : this.rect.rightTop().x - this.atomSize;
            stepX = step;
        }
        else {      /*Disposition.Vertical*/
            firstY = this.flow ? this.rect.p0.y : this.rect.p1.y - this.atomSize;
            stepY = step;
        }
        for(let i = 0; i < this.fullPeriodsCount; i++){     /*create full periods*/
            this.primitives.push(new Konva.Rect({
            x: firstX + i * stepX, y: firstY + i * stepY,
            height: this.atomSize, width:  this.atomSize, fill: '#E1F1FB'
        }));  }    
        if(this.lastShort) {
            if(this.quantityInShort > 1){
                this.primitives.push(new Konva.Rect({
                    x: firstX + this.fullPeriodsCount * stepX, 
                    y: firstY + this.fullPeriodsCount * stepY,
                    height: this.atomSize, width:  this.atomSize, fill: '#E1F1FB'
                }));
            }
            this.primitives.push(new Konva.Rect({       /*create first short*/
                x: this.rect.p0.x, y: this.rect.p0.y, fill: '#1D8EEA',
                height: this.disposition==Disposition.Horizontal ? this.atomSize : this.length, 
                width:  this.disposition==Disposition.Horizontal ? this.length : this.atomSize
            }));
        }
    }
}


export class Connection extends BaseMineDraw{
    private width: number;          // width of white square
    private period: number;         // ideal??? length of the one full element with one white rect moving
                                    // real length = step * frameCnt;
    private step: number;           // white square moving length
    private count: number;          // elements (parts) count 
    private dir: boolean = true;    // direction of flow upWord or leftWord == true decreases coordinate
    private frameCnt: number;       // count of annimation frames
    private running: boolean;
    constructor(p0: Point, length: number, disposition: Disposition, dir: boolean = true) {
        super(p0,length, disposition);
        this.width = this.getOdd(length);
        if(disposition == Disposition.Vertical){
            this.rect.p1.x = this.rect.p0.x + this.width;
            this.rect.p1.y = this.rect.p0.y + 100;
        }
        this.frameCnt = 4;
        this.dir = dir;
        this.running = true;
        this.period = this.width * this.frameCnt;   // length of the one full element with white rect moving
    }
    getHalf(): number{
        return (this.width - 1) / 2;
    }
    positionByPoints(beginP: Point, endP: Point){
        let half = this.getHalf();
        if(this.disposition == Disposition.Vertical){
            this.rect.p0.x = beginP.x - half;
            this.rect.p0.y = beginP.y;
            this.rect.p1.x = endP.x + half;
            this.rect.p1.y = endP.y;
        }
        else{
            this.rect.p0.x = beginP.x;
            this.rect.p0.y = beginP.y - half;
            this.rect.p1.x = endP.x;
            this.rect.p1.y = endP.y + half;
        }
    }
    calcParamsAndCreateElements(distance: number){
        this.count = Math.trunc(distance/this.period);   // count of elements 
        this.step = Math.trunc(distance/this.count/this.frameCnt);       // lenght of white rect movment 
        this.primitives.push( new Konva.Rect({ x: this.rect.p0.x, y: this.rect.p0.y, fill: '#1D8EEA',
            height: this.disposition == Disposition.Vertical ? distance : this.width,  
            width: this.disposition == Disposition.Vertical ? this.width : distance}) );
        for(let i = 0; i < this.count; i++){
            let dElementPos = this.step * this.frameCnt * i;
            if(this.dir) dElementPos += this.step * (this.frameCnt - 1);
            let dx = this.disposition == Disposition.Vertical ? 0 : dElementPos;
            let dy = this.disposition == Disposition.Vertical ? dElementPos : 0;   
            this.primitives.push(new Konva.Rect({x: this.rect.p0.x + dx, y: this.rect.p0.y + dy,
                     height: this.width, width: this.width, fill: '#E1F1FB'}));
        }
    }
    connectVertical(upObj: BaseMineDraw, downObj: BaseMineDraw, upword: boolean = true): boolean{
        this.dir = upword;
        let up = upObj.rect.getMiddleDownPoint();
        let dn = downObj.rect.getMiddleUpPoint(); 
        // console.log('-------------  up   ------>', JSON.stringify(up))
        // //this.printRect()
        // console.log('-------------  dn   ------>', JSON.stringify(dn))
        if(Math.abs(up.x - dn.x) > DeltaPoint) return false;
        this.positionByPoints(up, dn);
        this.calcParamsAndCreateElements(dn.y - up.y);
        return true;
    }
    connectHoriszontal(leftObj: BaseMineDraw, rightObj: BaseMineDraw, rightWord = true ): boolean{
        this.dir = rightWord;
        let right = rightObj.rect.getMiddleLeftPoint();
        let left = leftObj.rect.getMiddleRightPoint();
        if(Math.abs(right.y - left.y) > DeltaPoint) return false;
        this.positionByPoints(left, right);
        this.calcParamsAndCreateElements(right.x - left.x);
        return true;
    }
    connectObjCoordinate(obj: BaseMineDraw, coo: number, dir: boolean){
        let p0: Point;
        let p1: Point;
        let distance: number;
        this.dir = dir;
        if(this.disposition == Disposition.Vertical) {
            p0 = obj.rect.getMiddleDownPoint();
            p1 = new Point(p0.x, coo);
            distance = p1.y - p0.y;
        }
        else {
            p0 = obj.rect.getMiddleRightPoint();
            p1 = new Point(coo, p0.y)
            distance = p1.x - p0.x;
        }
        this.positionByPoints(p0, p1)
        this.calcParamsAndCreateElements(distance);
    }
    getOverlapedPoint(p: Point, overlap: number): Point{
        let dL: number = 0;
        let dx: number = 0;
        let dy: number = 0; 
        if(overlap > 0) dL = -this.width;
        else if(overlap < 0) dL = this.width;
        this.disposition == Disposition.Vertical ? dy += dL : dx += dL;
        return p.movePoint(dx, dy);
    }
    connectPointPoint(p0: Point, overlap0: number, p1: Point, overlap1: number){
        p0 = this.getOverlapedPoint(p0, overlap0);
        p1 = this.getOverlapedPoint(p1, -overlap1);
        this.positionByPoints(p0, p1);
        this.calcParamsAndCreateElements(this.disposition==Disposition.Vertical ? (p1.y - p0.y) : (p1.x - p0.x)); 
    }
    getBegin(overlap: number = 0): Point{
        let half = this.getHalf();
        return this.disposition==Disposition.Vertical ? new Point(this.rect.p0.x + this.width, this.rect.p0.y + half) :
                                                        new Point(this.rect.p0.x + half, this.rect.p0.y);
    }
    getEnd(): Point{
        let half = this.getHalf();
        return this.disposition==Disposition.Vertical ? new Point(this.rect.p1.x, this.rect.p1.y - half) :
                                                        new Point(this.rect.p1.x - half, this.rect.p1.y - this.width);
    }
    private moveWhite(): void{
        let dy: number = 0;
        let dx: number = 0;
        
        let maxFrameIndex = this.frameCnt - 1;
        let dStep = (this.animationFrame < maxFrameIndex) ? this.step : -(maxFrameIndex * this.step);
        if(this.dir) dStep = - dStep;
        if(this.disposition == Disposition.Vertical) dy = dStep;
        else dx = dStep;
        for(let i = 1; i < this.primitives.length; i++) this.primitives[i].move({x: dx, y: dy});
    }
    nextFrame(): void {
// return;
        this.moveWhite();
        if(this.animationFrame < this.frameCnt - 1) this.animationFrame +=1;
        else this.animationFrame = 0;
    };
}

        // for(let i = 0; i < this.count; i++){
        //     let nextY = this.step * 4 * i;
        //     if(upword){
        //         nextY += this.step * 3;
        //         this.primitives.push(new Konva.Rect({
        //             //x: r.x(), y: up.y + nextY, height: this.width, width: this.width, fill: '#E1F1FB'
        //             x: this.rect.p0.x, y: this.rect.p0.y + nextY, height: this.width, width: this.width, fill: '#E1F1FB'
        //         }));
        //     }
        //     else
        //         this.primitives.push(new Konva.Rect({
        //             // x: r.x(), y: up.y + nextY, height: this.width, width: this.width, fill: '#E1F1FB'
        //             x: this.rect.p0.x, y: this.rect.p0.y + nextY, height: this.width, width: this.width, fill: '#E1F1FB'
        //         }));
        // }



const CornerCenterSize = 49
export enum CornerOrientation {
    DownLeft = 0, LeftUp, UpRight, RightDown
}

export class Corner extends BaseMineDraw{
    private orientation: CornerOrientation;
    private direction: boolean;
    // types flags
    private LU_nDL: boolean;
    private UR_nLU: boolean;
    private RD_nUR: boolean;
    private DL_nRD: boolean;
// let DL_nRD = this.orientation==CornerOrientation.DownLeft && this.direction;
//     DL_nRD = DL_nRD || this.orientation==CornerOrientation.RightDown && !this.direction;

    //private period: number = 14 * 4;
    private step: number = 14;
    constructor(p0: Point, length: number, disposition: Disposition, orientation: CornerOrientation, direction: boolean){
        super(p0, CornerCenterSize * 2, disposition);
        this.orientation = orientation;
        this.direction = direction;
        this.LU_nDL = this.orientation==CornerOrientation.LeftUp && this.direction ||
                        this.orientation==CornerOrientation.DownLeft && !this.direction;
        this.UR_nLU = this.orientation==CornerOrientation.UpRight && this.direction ||
                        this.orientation==CornerOrientation.LeftUp && !this.direction;
        this.RD_nUR = this.orientation==CornerOrientation.RightDown && this.direction ||
                        this.orientation==CornerOrientation.UpRight && !this.direction;
        this.DL_nRD = this.orientation==CornerOrientation.DownLeft && this.direction ||
                        this.orientation==CornerOrientation.RightDown && !this.direction;                        
        for(let i = 0; i < 3; i++){
            this.primitives.push(new Konva.Line({
                points: this.getPoints(i), //[23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93]
                fill: i==0 ? '#1D8EEA' : '#E1F1FB',
                closed: true,
            }));
        }
        
    }
    private moveWhite(): void{
        let dy1: number = 0;
        let dx1: number = 0;
        let dy2: number = 0;
        let dx2: number = 0;
        let move: number = this.animationFrame != 3 ? this.step : -3 * this.step;
        if(this.LU_nDL){
            dx1 = move;
            dy2 = this.direction ?/* LU */  -move : /* nDL */ move;
        }
        else if(this.UR_nLU){
            dy1 = move;
            dx2 = this.direction ? /* UR */ move : /* nLU */ -move;
        }
        else if(this.RD_nUR)  {
            dx1 = -move;
            dy2 = this.direction ? /* RD */ move : /* nUR */ -move;
        }
        else /* this.DL_nRD */{
            dy1 = -move;
            dx2 = this.direction ? /* DL */ -move : /* nLU */ move;
        }
        this.primitives[1].move({x:dx1, y: dy1});
        this.primitives[2].move({x:dx2, y: dy2});
    }
    nextFrame(): void { 
        this.moveWhite();
        if(this.animationFrame < 3) this.animationFrame +=1;
        else this.animationFrame = 0;
    };
    protected calcSize(length: number, factor: number = 1): number {
        return length ;
    }
    protected getPoints(num: number): number[] {
        let cs = CornerCenterSize;
        let h = 7;
        //   1      2      3      4      5      6      7      8      9         10      11       12 
        //-cs,h,  -h,h,  -h,cs,  h,cs,  h,h,  cs,h,  cs,-h,  h,-h,  h,-cs,  -h,-cs,  -h,-h,  -cs,-h
        let ps: number[]; // = [-cs,h,  -h,h,  -h,cs,  h,cs,  h,h,  cs,h,  cs,-h,  h,-h,  h,-cs,  -h,-cs,  -h,-h,  -cs,-h ];
        if(num == 0){
            if(this.orientation == CornerOrientation.LeftUp) ps = [ h,-cs,  -h,-cs,  -h,-h,  -cs,-h, -cs,h, h,h ];
            else if(this.orientation == CornerOrientation.UpRight) ps = [ cs,h,  cs,-h,  h,-h,  h,-cs,  -h,-cs, -h,h ];
            else if(this.orientation == CornerOrientation.RightDown) ps = [-h,cs,  h,cs,  h,h,  cs,h,  cs,-h,  -h,-h ];
            else        /* DownLeft */              ps = [-cs,h,  -h,h,  -h,cs,  h,cs,  h,-h,  -cs,-h ];
        }
        else if(num ==1){
            console.log(`LU_nDL = ${this.LU_nDL}; UR_nLU = ${this.UR_nLU}; RD_nUR = ${this.RD_nUR}; DL_nRD = ${this.DL_nRD} `)
            if(this.LU_nDL) ps =       [ -cs,h,     2*h-cs,h,  2*h-cs,-h,  -cs,-h];
            else if(this.UR_nLU)  ps = [ -h,2*h-cs, h,2*h-cs,  h,-cs,      -h,-cs  ];
            else if(this.RD_nUR)  ps = [ cs-2*h,h,  cs,h,      cs,-h,      cs-2*h,-h ];
            else /* this.DL_nRD */ps = [ -h,cs,     h,cs,      h,cs-2*h,   -h,cs-2*h];
        }
        else ps = [-h,h,  h,h,  h,-h,  -h,-h]; // num==2 central point
        
        let res: number[] = [];
        for(let i = 0; i < ps.length; i += 2){
            console.log(`i = ${i}`);
            res.push( this.rect.getMiddlePoint().x + ps[i] );
            res.push( this.rect.getMiddlePoint().y + ps[i+1] );
        }
        return res;
    }
}

export function ConnectHV(upObj: BaseMineDraw, downObj: BaseMineDraw, sourceUp: boolean): (Corner|null){
    if(upObj.disposition == Disposition.Vertical) {
        let upDown = upObj.rect.getMiddleDownPoint();
        let dnRight = downObj.rect.getMiddleRightPoint();
        let dnLeft = downObj.rect.getMiddleLeftPoint();
        if(dnRight.x + CornerCenterSize <= upDown.x){   //down left from up
            return new Corner(new Point(upDown.x-CornerCenterSize, dnRight.y-CornerCenterSize), 1, 
                Disposition.Vertical, CornerOrientation.LeftUp, !sourceUp);
        }
        else if(upDown.x + CornerCenterSize <= dnLeft.x){   // down right from up
            return new Corner(new Point(upDown.x-CornerCenterSize, dnLeft.y-CornerCenterSize), 1, 
            Disposition.Vertical, CornerOrientation.UpRight, sourceUp);
        }
    }
    else{   // up object -- Horizontal
        let upLeft = upObj.rect.getMiddleLeftPoint();
        let upRight = upObj.rect.getMiddleRightPoint();
        let dnUp = downObj.rect.getMiddleUpPoint();
        if(dnUp.x + CornerCenterSize <= upLeft.x){      // down left from up
            return new Corner(new Point(dnUp.x-CornerCenterSize, upLeft.y-CornerCenterSize), 1, 
                Disposition.Vertical, CornerOrientation.RightDown, sourceUp);
        }
        else if(upRight.x + CornerCenterSize <= dnUp.x){    // down right from up
            return new Corner(new Point(dnUp.x-CornerCenterSize, upRight.y-CornerCenterSize), 1, 
                Disposition.Vertical, CornerOrientation.DownLeft, !sourceUp);
        }
    }
    return null;
}
// export function testArray(){
//     let arr:(string|number)[] = [];
//     arr.push(1);
//     arr.push(2)
//     arr.push('asdfasd');
//     console.log(arr);
// }