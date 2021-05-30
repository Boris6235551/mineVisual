import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Bunker, FeederLeft, FeederRight, ChuteLeft, ChuteRight, BatcherLeft, BatcherRight, GateLeft, GateRight, TongueLeft, TongueRight } from './batcher'

export class BATCHER extends Scheme {
    public BunkerLeft: Bunker;
    public BunkerRight: Bunker;
    public FeederLeft1: FeederLeft;
    public FeederRight1: FeederRight;
    public ChuteLeft1: ChuteLeft;
    public ChuteRight1: ChuteRight;
    public GateLeft1: GateLeft;
    public GateRight1: GateRight;
    public TongueLeft1: TongueLeft;
    public TongueRight1: TongueRight;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Batcher';
        this.addBatcher();
    }
    addBatcher() {
        this.BunkerLeft = new Bunker(new Point(-75, 233), 2)
        this.addWidget(this.BunkerLeft);

        this.BunkerRight = new Bunker(new Point(282, 233), 2)
        this.addWidget(this.BunkerRight);

        this.FeederLeft1 = new FeederLeft(new Point(-75, 232), 2)
        this.addWidget(this.FeederLeft1);

        this.FeederRight1 = new FeederRight(new Point(325, 232), 2)
        this.addWidget(this.FeederRight1);

        this.ChuteLeft1 = new ChuteLeft(new Point(-48, 340), 2)
        this.addWidget(this.ChuteLeft1);

        this.ChuteRight1 = new ChuteRight(new Point(292, 340), 2)
        this.addWidget(this.ChuteRight1);

        let BatcherLeft1 = new BatcherLeft(new Point(-60, 400), 2)
        this.addWidget(BatcherLeft1);

        let BatcherRight1 = new BatcherRight(new Point(280, 400), 2)
        this.addWidget(BatcherRight1);

        this.GateLeft1 = new GateLeft(new Point(-60, 400), 2)
        this.addWidget(this.GateLeft1);

        this.GateRight1 = new GateRight(new Point(280, 400), 2)
        this.addWidget(this.GateRight1);

        this.TongueLeft1 = new TongueLeft(new Point(-60, 400), 2)
        this.addWidget(this.TongueLeft1);

        this.TongueRight1 = new TongueRight(new Point(280, 400), 2)
        this.addWidget(this.TongueRight1);
    }
}