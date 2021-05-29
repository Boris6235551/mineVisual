import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Bunker, FeederLeft, FeederRight, ChuteLeft, ChuteRight, BatcherLeft, BatcherRight, GateLeft, GateRight, TangueLeft, TangueRight } from './batcher'

export class BATCHER extends Scheme {
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Batcher';
        this.addBatcher();
    }
    addBatcher() {
        let BunkerLeft = new Bunker(new Point(-75, 233), 2)
        this.addWidget(BunkerLeft);

        let BunkerRight = new Bunker(new Point(282, 233), 2)
        this.addWidget(BunkerRight);

        let FeederLeft1 = new FeederLeft(new Point(-75, 232), 2)
        this.addWidget(FeederLeft1);

        let FeederRight1 = new FeederRight(new Point(325, 232), 2)
        this.addWidget(FeederRight1);

        let ChuteLeft1 = new ChuteLeft(new Point(-48, 340), 2)
        this.addWidget(ChuteLeft1);

        let ChuteRight1 = new ChuteRight(new Point(292, 340), 2)
        this.addWidget(ChuteRight1);

        let BatcherLeft1 = new BatcherLeft(new Point(-60, 400), 2)
        this.addWidget(BatcherLeft1);

        let BatcherRight1 = new BatcherRight(new Point(280, 400), 2)
        this.addWidget(BatcherRight1);

        let GateLeft1 = new GateLeft(new Point(-60, 400), 2)
        this.addWidget(GateLeft1);

        let GateRight1 = new GateRight(new Point(280, 400), 2)
        this.addWidget(GateRight1);

        let TangueLeft1 = new TangueLeft(new Point(-60, 400), 2)
        this.addWidget(TangueLeft1);

        let TangueRight1 = new TangueRight(new Point(280, 400), 2)
        this.addWidget(TangueRight1);
    }
}