
// https://www.typescriptlang.org/docs/handbook/classes.html

import Konva from "konva";

enum Disposition {
    Vertical = 0,
    Horizontal
};

class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number; 
};

class BaseMineDraw {
    protected type: string;
    readonly rect: Rectangle;
    readonly disposition: Disposition;
    constructor(x: number, y: number, length: number, disposition: Disposition) {
        this.rect.x = x;
        this.rect.y = y;
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
    
    draw(scheme: Scheme): void{};
    // get rect(): Rectangle{
    //     return this.rect;
    // }

};

class Scheme {
    private widgets: BaseMineDraw[];
    private stage: Konva.Stage;
    private layer: Konva.Layer;
    constructor(container: string, width: number, height: number) {
        this.stage = new Konva.Stage({
            container: container,
            width: width,
            height: height
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer); 
    }
}

class Pump extends BaseMineDraw {
    constructor(x: number, y: number, length: number, disposition: Disposition) {
        super(x,y, length,disposition);
        this.type = 'Pump';
    }

    calcSize(factor = 1.45): number {
        return super.calcSize(factor);
    }

}