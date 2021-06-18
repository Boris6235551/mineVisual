import { Scheme, Disposition, Point, PropParams } from './mine_drawing';
import { ReceivingHopper } from './dsf'

export class RECEIVINGHOPPER extends Scheme {
    private ReceivingHopper1: ReceivingHopper;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Skip';

        this.ReceivingHopper1 = new ReceivingHopper(new Point(300, 70), 60);
        this.addWidget(this.ReceivingHopper1);
        this.ReceivingHopper1.name = 'Skip';
    }
}
