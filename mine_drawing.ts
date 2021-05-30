import Konva from 'konva';
//const Konva = require('konva');
// https://www.typescriptlang.org/docs/handbook/classes.html

export enum Disposition {
    Vertical = 0,
    Horizontal
};

export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x; this.y = y;
    };
    copyPoint(p: Point): void {
        this.x = p.x;
        this.y = p.y;
    }
};

export class Rectangle {
    p0: Point;
    p1: Point;
    constructor(p0: Point, p1: Point) {
        this.p0 = new Point(0, 0);
        this.p1 = new Point(0, 0);
        this.p0.copyPoint(p0);
        this.p1.copyPoint(p1);
    };
    rightTop(): Point {
        let Rx = this.p1.x;
        let Ry = this.p0.y;
        return new Point(Rx, Ry);
    }
    leftButtom(): Point {
        let Ly = this.p1.y;
        let Lx = this.p0.x;
        return new Point(Lx, Ly);
    }
    getMiddlePoint(): Point {
        let lx = this.p0.x + Math.trunc((this.p1.x - this.p0.x) / 2) + 1;
        let ly = this.p0.y + Math.trunc((this.p1.y - this.p0.y) / 2) + 1;
        return new Point(lx, ly);
    }
    getMiddleUpPoint(): Point {
        return new Point(this.getMiddlePoint().x, this.p0.y);
    }
    getMiddleDownPoint(): Point {
        return new Point(this.getMiddlePoint().x, this.p1.y);
    }
    getMiddleRightPoint(): Point {
        return new Point(this.p0.x, this.getMiddlePoint().y);
    }
    getMiddleLeftPoint(): Point {
        return new Point(this.p1.x, this.getMiddlePoint().y);
    }
    copyRect(source: Rectangle): void {
        this.p0.copyPoint(source.p0);
        this.p1.copyPoint(source.p1);
    }

};

export class PropParams {
    bit: boolean;
    byte: number;
    word: number;
    // constructor(bit: boolean, byte: number, word: number) {
    //     this.bit = bit;
    //     this.byte = byte;
    //     this.word = word;
    // }
}

export class BaseMineDraw {
    public name: string;
    public propBit: boolean = true;
    readonly rect: Rectangle;
    readonly disposition: Disposition;
    public state: any;
    protected animationFrame: number = 0;
    protected primitives: (Konva.Rect | Konva.Text | Konva.Circle | Konva.Line)[] = [];
    protected layer: Konva.Layer;
    constructor(p0: Point, length: number, disposition?: Disposition, percentage?: number) {
        this.name = "Base";
        this.disposition = disposition;
        let dx: number;
        let dy: number;
        if (disposition == Disposition.Vertical) {
            dy = this.getOdd(length);
            dx = this.calcSize(length);
        }
        else {
            dx = this.getOdd(length);
            dy = this.calcSize(length);
        }
        this.rect = new Rectangle(p0, new Point(p0.x + dx, p0.y + dy));
    }
    protected getOdd(num: number): number {
        return Math.trunc(num / 2) * 2 + 1;
    }
    protected calcSize(length: number, factor: number = 1): number {
        return this.getOdd(length / factor);
    };

    move(delta: { x: number, y: number }) {
        if (this.primitives.length == 0) return;
        for (let i = 0; i < this.primitives.length; i++) this.primitives[i].move(delta);
        //this.layer.draw();
    }
    // addToScheme(scheme: Scheme): void{

    // };
    draw(layer: Konva.Layer): void {
        this.layer = layer;
        console.log(`this.primitives.length ${this.primitives.length}`)
        if (this.primitives.length) {
            for (let i = 0; i < this.primitives.length; i++) layer.add(this.primitives[i]);
        }
        this.layer.draw();
    };
    nextFrame(): void { };
    // get rect(): Rectangle{
    //     return this.rect;
    // }
    setBaseProperty(mes: any) {
        if(mes.hasOwnProperty(this.name)) this.propBit = mes[this.name];
    }
};

export class Scheme {
    name: string;
    private stop: boolean;
    widgets: BaseMineDraw[];
    stage: Konva.Stage;
    private layer: Konva.Layer;
    private interval: NodeJS.Timeout;
    constructor(container: string, width: number, height: number) {
        this.stop = false;
        clearInterval(this.interval);
        this.widgets = [];
        this.stage = new Konva.Stage({
            container: container,
            width: width,
            height: height
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        if (this.widgets.length) this.interval = setInterval(this.update, 100);
    }
    send(mes: any){
        // let props = Object.getOwnPropertyNames(mes);
        // this.widgets.forEach( widget => {
        //     let prop = props.find( pr => pr == widget.name );
        //     if(prop != undefined) {
        //         //console.log(`@@@@@@@@@@@@@ widget.name=${widget.name}; prop=${prop}; mes[prop]=${mes[prop]}`) 
        //         widget.setBaseProperty(mes[prop]);
        //     }
        //     //else console.log(`widget.name ${widget.name} is not finded`)
        // });
        this.widgets.forEach( w => {w.setBaseProperty(mes)} );
        this.update();
    }
    addWidget(widget: BaseMineDraw) {
        this.widgets.push(widget);
        console.log("Scheme . addWidget ", typeof this.widgets, this.widgets);
        //for(let i = 0; i < this.widgets.length; i++) this.widgets[i].draw(this.layer);
        this.widgets[this.widgets.length - 1].draw(this.layer);
        this.layer.draw();
        //if(this.interval == undefined) this.interval = setInterval(this.update, 1000 );
        //console.log('this.interval', typeof this.interval, this.interval);

    }
    startStop(): void{
        if(this.stop) this.stop = false;
        else this.stop = true;
    }
    update(): void {
        if(this.stop) return;
        //console.log('uppppppdaaaate', typeof this.widgets);
        //if(this.widgets.length == 0) return;
        for (let i = 0; i < this.widgets.length; i++) this.widgets[i].nextFrame();
        this.layer.draw();
    }
}
let interval: NodeJS.Timeout;

export function animateScheme(scheme: Scheme, timeOut: number) {
    interval = setInterval(() => { scheme.update(); }, timeOut);
}


export class Screen {
    schemes: Scheme [];
    constructor(){
        this.schemes = [];
    }
    addScheme(scheme: Scheme){
        this.schemes.push(scheme);
    }
    resendMessage(/*scheme name*/objName: string, mes: any){
        this.schemes.forEach(function(scheme) {
            if(scheme.name == objName) {
                scheme.send(mes);
            }
        });
    }
}


// this.primitives[ValvePrimitive.triangle0], 
export class Pool extends BaseMineDraw {
    private rectangle1: Konva.Rect;
    private rectangle2: Konva.Rect;
    // private rectangle3: Konva.Rect;
    private rectangle3: any[] = new Array()
    private circle: Konva.Circle;
    private openingSize: Konva.Text;
    //private primitives: any[]; // triangle0, triangle1, rectangleCentr, круг, текст
    constructor(p0: Point, length: number, percentage) {
        super(p0, length, percentage);
        this.name = 'Pool';
        this.rectangle1 = this.createRectangle1(p0, length);
        this.rectangle2 = this.createRectangle2(p0, length);
        let i: number;
        let waterLevel: string[] = [
            '#02498B', '#00519C', '#0061BA', '#0071D9', '#0085FF',
            '#1F94FF', '#359EFF', '#5BB1FF', '#8DC9FF', '', '#02498B'
        ];
        if (percentage == 0) this.rectangle3[0] = this.createRectangle3(p0, length, waterLevel[9])
        else if (percentage == 100) this.rectangle3[0] = this.createRectangle3(p0, length, waterLevel[9])
        else {
            p0.y = p0.y + this.calcSize(length) * 0.93 - 5;
            for (i = 0; i < percentage.toString()[0]; i++) {
                p0.y = p0.y - this.calcSize(length) * 0.093;
                this.rectangle3[i] = this.createRectangle3(p0, length, waterLevel[i])
            }
        }

        this.circle = this.createCircle(length);
    }

    private createRectangle1(p0, length: number): Konva.Rect {
        return new Konva.Rect({
            x: p0.x,
            y: p0.y,
            height: this.calcSize(length),
            width: length,
            fill: '#FE896F',
            stroke: '#D28878',
            strokeWidth: 10,
            cornerRadius: 10
        });
    }

    private createRectangle2(p0, length: number): Konva.Rect {
        return new Konva.Rect({
            x: p0.x + this.calcSize(length) * 0.125,
            y: p0.y - 3,
            height: this.calcSize(length) * 0.93,
            width: length * 0.84,
            fill: '#E1F1FB',
            stroke: '#34E7E7',
            strokeWidth: 5,
            cornerRadius: 10
        });
    }

    private createRectangle3(p0, length: number, waterLevel): Konva.Rect {
        return new Konva.Rect({
            x: p0.x + this.calcSize(length) * 0.125 + 3,
            y: p0.y,
            height: this.calcSize(length) * 0.093,
            width: length * 0.84 - 6,
            fill: waterLevel,
            // stroke: '',
            // strokeWidth: 0,
            cornerRadius: [0, 0, 50, 0],
        });
    }

    private createCircle(length: number): Konva.Circle {
        let x: number;
        let y: number;
        if (this.disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x;
            y = this.rect.getMiddlePoint().y - Math.trunc(0.39 * length);
        } else {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.39 * length);
            y = this.rect.getMiddlePoint().y;
        };
        return new Konva.Circle({
            x: x,
            y: y,
            radius: Math.trunc(length / 4.79),
            fill: '',
            stroke: '',
            strokeWidth: 1,
        });
    }

    private createText(length, disposition): Konva.Text {
        let x: number;
        let y: number;
        if (disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.1 * length);
            y = this.rect.getMiddlePoint().y - Math.trunc(0.43 * length);
        } else {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.5 * length);
            y = this.rect.getMiddlePoint().y - Math.trunc(0.04 * length);
        };
        return new Konva.Text({
            x: x,
            y: y,
            text: '100 %',
            fontSize: 18,
            fontFamily: 'Roboto',
            fill: '',
        });
    }

    protected calcSize(length: number, factor: number = 1.59): number {
        return this.getOdd(length / factor);
    };


    draw(layer: Konva.Layer): void {
        let i: number;
        for (i = 0; i < this.rectangle3.length; i++)
            layer.add(this.rectangle1, this.rectangle2, this.rectangle3[i]);
    }
}

