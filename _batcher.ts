import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Bunker, FeederLeft, FeederRight, ChuteLeft, ChuteRight, BatcherLeft, BatcherRight, GateLeft, GateRight, TongueLeft, TongueRight, LeftInfo, RightInfo, ShiftInfo } from './batcher'

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
    public LeftInfo1: LeftInfo;
    public RightInfo1: RightInfo;
    public ShiftInfo1: ShiftInfo;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Batcher';
        this.addBatcher();
    }
    addBatcher() {
        this.BunkerLeft = new Bunker(new Point(1262, 333), 2)
        this.addWidget(this.BunkerLeft);

        this.BunkerRight = new Bunker(new Point(1617, 333), 2, false)
        this.addWidget(this.BunkerRight);

        this.FeederLeft1 = new FeederLeft(new Point(1262, 332), 2)
        this.addWidget(this.FeederLeft1);

        this.FeederRight1 = new FeederRight(new Point(1660, 332), 2)
        this.addWidget(this.FeederRight1);

        this.ChuteLeft1 = new ChuteLeft(new Point(1289, 440), 2)
        this.addWidget(this.ChuteLeft1);

        this.ChuteRight1 = new ChuteRight(new Point(1627, 440), 2)
        this.addWidget(this.ChuteRight1);

        let BatcherLeft1 = new BatcherLeft(new Point(1277, 500), 2)
        this.addWidget(BatcherLeft1);

        let BatcherRight1 = new BatcherRight(new Point(1615, 500), 2)
        this.addWidget(BatcherRight1);

        this.GateLeft1 = new GateLeft(new Point(1277, 500), 2)
        this.addWidget(this.GateLeft1);

        this.GateRight1 = new GateRight(new Point(1615, 500), 2)
        this.addWidget(this.GateRight1);

        this.TongueLeft1 = new TongueLeft(new Point(1277, 500), 2)
        this.addWidget(this.TongueLeft1);

        this.TongueRight1 = new TongueRight(new Point(1615, 500), 2)
        this.addWidget(this.TongueRight1);

        this.LeftInfo1 = new LeftInfo(new Point(1390, 700), 80)
        this.addWidget(this.LeftInfo1);

        this.RightInfo1 = new RightInfo(new Point(1694, 700), 80)
        this.addWidget(this.RightInfo1);

        this.ShiftInfo1 = new ShiftInfo(new Point(1694, 800), 80)
        this.addWidget(this.ShiftInfo1);
    }
}