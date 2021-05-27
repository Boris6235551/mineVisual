import Konva from 'konva';
import {BaseMineDraw, Scheme, Disposition, animateScheme, Point} from './mine_drawing';

const DeltaPoint = 20;
//Tee
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
    // draw(layer: Konva.Layer): void{
    //     super.draw(layer);
    // }
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