import Konva from 'konva';
import {BaseMineDraw, Scheme, Disposition, animateScheme, Point} from './mine_drawing';

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
    private atomSize: number = 13;
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
    private period: number;
    private step: number;
    //whitePlaces: Point[] 
    constructor(p0: Point, length: number, disposition: Disposition) {
        super(p0,length, disposition);
        if(disposition == Disposition.Vertical){
            this.rect.p1.x = this.rect.p0.x + 14;
            this.rect.p1.y = this.rect.p0.y + 100;
        }
        this.period = 14 * 4;
    }
    connectVertical(upObj: BaseMineDraw, downObj: BaseMineDraw): boolean{
        let up = upObj.rect.getMiddleDownPoint();
        let dn = downObj.rect.getMiddleUpPoint(); 
        if(Math.abs(up.x - dn.x) > DeltaPoint) return false;
        let distance = /*distance*/(dn.y - up.y);
        let count = Math.trunc(distance/this.period);
        this.step = Math.trunc(distance/count/4);
        console.log(`connectVertical count = ${count}; and step = ${this.step}`)
        let r = new Konva.Rect({
            //x: up.x - 7, y: up.y, height: count * 14 * 4, width: 14, fill: '#1D8EEA'
            x: up.x - 7, y: up.y, height: distance, width: 14, fill: '#1D8EEA'
        });
        this.primitives.push(r);
        for(let i = 0; i < count; i++){
            this.primitives.push(new Konva.Rect({
                //x: r.x(), y: up.y + (this.period * i), height: 14, width: 14, fill: '#E1F1FB'
                x: r.x(), y: up.y + (this.step * 4 * i), height: 14, width: 14, fill: '#E1F1FB'
            }));
        }
        return true;
    }
    draw(layer: Konva.Layer): void{
        super.draw(layer);
    }
    private moveWhite(): void{
        let dy: number;
        if(this.animationFrame < 3) dy = this.step;
        else dy = -(3*this.step);
        for(let i = 1; i < this.primitives.length; i++) this.primitives[i].move({x:0, y: dy});
    }
    nextFrame(): void { 
        this.moveWhite();
        if(this.animationFrame < 3) this.animationFrame +=1;
        else this.animationFrame = 0;
    };
}

//Tee
enum CornerOrientation {
    DownLeft = 0, LertUp, UpRight, RightDown
}

export class Corner extends BaseMineDraw{
    private orientation: CornerOrientation;
    private direction: boolean;
    constructor(p0: Point, length: number, disposition: Disposition, orientation: CornerOrientation, direction: boolean){
        super(p0, length, disposition);
        this.orientation = orientation;
        this.direction = direction;
    }
}

export function testArray(){
    let arr:(string|number)[] = [];
    arr.push(1);
    arr.push(2)
    arr.push('asdfasd');
    console.log(arr);
}