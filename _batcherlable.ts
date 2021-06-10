import { Scheme, Point } from './mine_drawing';
import { LeftInfo, RightInfo, ShiftInfo } from './batcherlable'

export class BATCHERLABLE extends Scheme {
    public LeftInfo1: LeftInfo;
    public RightInfo1: RightInfo;
    public ShiftInfo1: ShiftInfo;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'BatcherLable';
        this.addBatcher();
    }
    addBatcher() {
        this.LeftInfo1 = new LeftInfo(new Point(1390, 700), 80)
        this.addWidget(this.LeftInfo1);

        this.RightInfo1 = new RightInfo(new Point(1694, 700), 80)
        this.addWidget(this.RightInfo1);

        this.ShiftInfo1 = new ShiftInfo(new Point(1490, 800), 80)
        this.addWidget(this.ShiftInfo1);
    }
}