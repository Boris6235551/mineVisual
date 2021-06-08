import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Pump } from './compressorRoom'

export class COMPRESSORROOM extends Scheme {
    public Pump1: Pump;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Compressorroom';
        this.addBatcher();
    }
    addBatcher() {
        this.Pump1 = new Pump(new Point(400, 100), 80, 0)
        this.addWidget(this.Pump1);
    }
}