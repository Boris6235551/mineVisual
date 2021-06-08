import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Pump, Undegraund } from './Pump'

export class UNDEGROUNDPUMP extends Scheme {
    public Pump1: Pump;
    public Undegraund1: Undegraund;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Undegroundpump';
        this.addBatcher();
    }
    addBatcher() {
        this.Pump1 = new Pump(new Point(200, 233), 100, 1)
        this.addWidget(this.Pump1);

        this.Undegraund1 = new Undegraund(new Point(400, 233), 100, 1)
        this.addWidget(this.Undegraund1);
    }
}