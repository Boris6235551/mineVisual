import Konva from 'konva';
import {BaseMineDraw, Scheme, Disposition, animateScheme, Point} from './mine_drawing';

const DeltaPoint = 20;
//Tee
export class Connection extends BaseMineDraw{
    period: number;
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
        let count = Math.trunc(/*distance*/(dn.y - up.y)/this.period);
        //console.log(`connectVertical count = ${count}`)
        let r = new Konva.Rect({
            x: up.x - 7, y: up.y, height: count * 14 * 4, width: 14, fill: '#1D8EEA'
        });
        this.primitives.push(r);
        for(let i = 0; i < count; i++){
            this.primitives.push(new Konva.Rect({
                x: r.x(), y: up.y + (this.period * i), height: 14, width: 14, fill: '#E1F1FB'
            }));
        }
        return true;
    }
    draw(layer: Konva.Layer): void{
        super.draw(layer);
    }
    private moveWhite(): void{
        let dy: number;
        if(this.animationFrame < 3) dy = 14;
        else dy = -(3*14);
        for(let i = 1; i < this.primitives.length; i++) this.primitives[i].move({x:0, y: dy});
    }
    nextFrame(): void { 
        this.moveWhite();
        if(this.animationFrame < 3) this.animationFrame +=1;
        else this.animationFrame = 0;
    };
}

export function testArray(){
    let arr:(string|number)[] = [];
    arr.push(1);
    arr.push(2)
    arr.push('asdfasd');
    console.log(arr);
}