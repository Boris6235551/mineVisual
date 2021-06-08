import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Pump, UndegraundPump,  } from './compressorRoom'

export class COMPRESSORROOM extends Scheme {
    public Pump1: Pump;
    public Pump2: Pump;
    public Pump3: Pump;
    public Pump4: Pump;
    public Pump5: Pump;
    // public Pool1: Pool;
    // public UndegraundPump1: UndegraundPump;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Compressorroom';
        this.addBatcher();
    }
    addBatcher() {
        this.Pump1 = new Pump(new Point(400, 100), 100, 0)
        this.addWidget(this.Pump1);

        this.Pump2 = new Pump(new Point(500, 100), 100, 0)
        this.addWidget(this.Pump2);

        this.Pump3 = new Pump(new Point(600, 100), 100, 0)
        this.addWidget(this.Pump3);

        this.Pump4 = new Pump(new Point(700, 100), 100, 0)
        this.addWidget(this.Pump4);

        this.Pump5 = new Pump(new Point(800, 100), 100, 0)
        this.addWidget(this.Pump5);

        // this.Pool1 = new Pool(new Point(800, 200), 100, 0)
        // this.addWidget(this.Pool1);

        // this.UndegraundPump1 = new UndegraundPump(new Point(800, 300), 100, 0)
        // this.addWidget(this.UndegraundPump1);
    }
}