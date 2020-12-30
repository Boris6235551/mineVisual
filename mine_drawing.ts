
// https://www.typescriptlang.org/docs/handbook/classes.html

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
    type: string;
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

    /* call in child class
        calcSize(factor = 1.35) {
            super.calcSize(factor);
        }
    */
    protected calcSize(factor: number = 1.35): number{
        return (this.disposition==Disposition.Vertical) ? this.rect.height * factor : this.rect.width * factor; 
    }
};
