import Konva from 'konva';
//const Konva = require('konva');
// https://www.typescriptlang.org/docs/handbook/classes.html

export enum Disposition {
    Vertical = 0,
    Horizontal
};

export class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number; 
    constructor(x: number, y: number, width: number = 0, height: number = 0 ){
        this.x = x; this.y = y; this.width = width; this.height = height;
    };
};

class BaseMineDraw {
    protected type: string;
    readonly rect: Rectangle;
    readonly disposition: Disposition;
    constructor(x: number, y: number, length: number, disposition: Disposition) {
        this.type = "Base";
        this.rect = new Rectangle(x,y);
        //this.rect.x = x;
        //this.rect.y = y;
        this.disposition = disposition;
        if(disposition==Disposition.Vertical) {
            this.rect.height = length;
            this.rect.width = this.calcSize();
        }
        else {
            this.rect.width = length;
            this.rect.height = this.calcSize();
        }
    }
    protected calcSize(factor: number = 1.35): number{
        return (this.disposition==Disposition.Vertical) ? this.rect.height * factor : this.rect.width * factor; 
    }
    // addToScheme(scheme: Scheme): void{
        
    // };
    draw(layer: Konva.Layer): void{};
    nextState():void{};
    // get rect(): Rectangle{
    //     return this.rect;
    // }

};

export class Scheme {

    widgets: BaseMineDraw[];
    stage: Konva.Stage;
    private layer: Konva.Layer;
    private interval: NodeJS.Timeout;
    constructor(container: string, width: number, height: number) {
        clearInterval(this.interval);
        this.widgets = [];
        this.stage = new Konva.Stage({
            container: container,
            width: width,
            height: height
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer); 
        if(this.widgets.length) this.interval = setInterval(this.update, 1000 );
    }
    addWidget(widget: BaseMineDraw){
        this.widgets.push(widget);
        console.log("Scheme . addWidget ", typeof this.widgets, this.widgets);
        this.widgets[this.widgets.length - 1].draw(this.layer);
        this.layer.draw();
        //if(this.interval == undefined) this.interval = setInterval(this.update, 1000 );
        console.log('this.interval', typeof this.interval, this.interval);
        
    }
    update():void{
        //console.log('uppppppdaaaate', typeof this.widgets);
        //if(this.widgets.length == 0) return;
        for(let i = 0; i < this.widgets.length; i++) this.widgets[i].nextState();
        this.layer.draw();
    }
}
let interval: NodeJS.Timeout;

export function animateScheme(scheme: Scheme, timeOut: number){
    interval = setInterval( ()=>{scheme.update();} , timeOut );
}

export class Pump extends BaseMineDraw {
    private state: number;
    //private ind: number;
    private rects: Konva.Rect[];   // Konva.Rect
    private main: Konva.Rect;
    constructor(x: number, y: number, length: number, disposition: Disposition) {
        super(x,y, length,disposition);
        this.rects = [];
        this.type = 'Pump';
        this.state = 0;
        //this.ind = 0;
        this.main = new Konva.Rect({
            x: 10,
            y: 10,
            width: 240,
            height: 80,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 4,
            cornerRadius: 16
        });
        for(let i = 0; i < 6; i++){
            let x = 10 + 40 * i;
            let color: string;
            if(i == 2 || i == 5) color = 'white';
            else color = 'blue'; 
            let r = new Konva.Rect({
                x: i==5 ? x-20 : x,
                y: 10,
                width: (i==0 || i==5) ? 60 : 40,
                height: 80,
                fill: color,
                stroke: 'black',
                strokeWidth: 4,
                cornerRadius: (i==0 || i==5) ? 16 : 0
            });
            this.rects.push(r);
        }
    }
    nextState():void{
        switch (this.state){
            case 0:
                // 2, 5
                this.rects[1].fill('blue');
                this.rects[2].fill('white');
                this.rects[4].fill('blue');
                this.rects[5].fill('white');
                break;
            case 1:
                // 0, 3
                this.rects[5].fill('blue');
                this.rects[0].fill('white');
                this.rects[2].fill('blue');
                this.rects[3].fill('white');
                break;
            case 2:
                // 1, 4
                this.rects[0].fill('blue');
                this.rects[1].fill('white');
                this.rects[3].fill('blue');
                this.rects[4].fill('white');
                break;
        }
        if(this.state == 2) this.state = 0;
        else this.state++;
    };
    draw(layer: Konva.Layer): void{
        layer.add(this.main);
        for(let i = 0; i < 4; i++) layer.add(this.rects[i]);
        layer.add(this.rects[5]);
        layer.add(this.rects[4]);
    }
    calcSize(factor = 1.45): number {
        return super.calcSize(factor);
    }

}
// export = Pump;
// export = Scheme;

// module.exports = {
//     Pump: Pump,
//     Scheme: Scheme,
//     Disposition: Disposition
// }