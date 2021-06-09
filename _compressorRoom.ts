import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Pump, UndegraundPump, Pool, Valve } from './compressorRoom'

export class COMPRESSORROOM extends Scheme {
    public Pump1: Pump;
    public Pump2: Pump;
    public Pump3: Pump;
    public Pump4: Pump;
    public Pump5: Pump;
    public Pool1: Pool;
    public Valve1: Valve;
    // public UndegraundPump1: UndegraundPump;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Compressorroom';
        this.addBatcher();
    }
    addBatcher() {
        this.Pump1 = new Pump(new Point(430, 350), 100, 0)
        this.addWidget(this.Pump1);

        this.Pump2 = new Pump(new Point(612.5, 350), 100, 0)
        this.addWidget(this.Pump2);

        this.Pump3 = new Pump(new Point(795, 350), 100, 0)
        this.addWidget(this.Pump3);

        this.Pump4 = new Pump(new Point(977.5, 350), 100, 0)
        this.addWidget(this.Pump4);

        this.Pump5 = new Pump(new Point(1160, 350), 100, 0)
        this.addWidget(this.Pump5);

        this.Pool1 = new Pool(new Point(400, 550), 900)
        this.addWidget(this.Pool1);

        this.Valve1 = new Valve(new Point(360, 100), 50, 0, 50)
        this.addWidget(this.Valve1);

        // this.UndegraundPump1 = new UndegraundPump(new Point(800, 300), 100, 0)
        // this.addWidget(this.UndegraundPump1);
    }
}