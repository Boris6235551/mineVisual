import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Pump } from './Pump'

export class UNDEGROUNDPUMP extends Scheme {
    public Pump1: Pump;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Undegroundpump';
        this.addBatcher();
    }
    addBatcher() {
        this.Pump1 = new Pump(new Point(200, 233), 100, 1)
        this.addWidget(this.Pump1);
    }
}