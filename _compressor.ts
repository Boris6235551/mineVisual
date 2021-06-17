import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Compressor } from './pumpAccessories'

export class COMPRESSOR extends Scheme {
    public Compressor1: Compressor;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Compressor';
        this.addBatcher();
    }
    addBatcher() {

        this.Compressor1 = new Compressor(new Point(1500, 100), 330)
        this.addWidget(this.Compressor1);
    }
}