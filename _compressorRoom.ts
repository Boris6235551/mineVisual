import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Pump, UndegraundPump, Pool, Valve, ValveCheck } from './compressorRoom'

export class COMPRESSORROOM extends Scheme {
    public Pump1: Pump;
    public Pump2: Pump;
    public Pump3: Pump;
    public Pump4: Pump;
    public Pump5: Pump;
    public Pool1: Pool;
    public Valve1: Valve;
    public Valve2: Valve;
    public Valve3: Valve;
    public Valve4: Valve;
    public Valve5: Valve;
    public Valve6: Valve;
    public Valve7: Valve;
    public Valve8: Valve;
    public Valve9: Valve;
    public Valve10: Valve;
    public Valve11: Valve;
    public Valve12: Valve;
    public Valve13: Valve;
    public Valve14: Valve;
    public Valve15: Valve;
    public Valve16: Valve;
    public Valve17: Valve;
    public Valve18: Valve;
    public Valve19: Valve;
    public Valve20: Valve;
    public Valve21: Valve;
    public Valve22: Valve;
    public Valve23: Valve;
    public Valve24: Valve;
    public Valve25: Valve;
    public ValveCheck1: ValveCheck;
    public ValveCheck2: ValveCheck;
    public ValveCheck3: ValveCheck;
    public ValveCheck4: ValveCheck;
    public ValveCheck5: ValveCheck;
    public ValveCheck6: ValveCheck;
    public ValveCheck7: ValveCheck;
    public ValveCheck8: ValveCheck;
    public ValveCheck9: ValveCheck;
    public ValveCheck10: ValveCheck;
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

        this.Valve1 = new Valve(new Point(400, 100), 30, 1, 50)
        this.addWidget(this.Valve1);
        this.Valve1.name = 'Y11'

        this.Valve2 = new Valve(new Point(492, 100), 30, 1, 50)
        this.addWidget(this.Valve2);
        this.Valve2.name = 'Y12'

        this.Valve3 = new Valve(new Point(584, 100), 30, 1, 50)
        this.addWidget(this.Valve3);
        this.Valve3.name = 'Y21'

        this.Valve4 = new Valve(new Point(676, 100), 30, 1, 50)
        this.addWidget(this.Valve4);
        this.Valve4.name = 'Y22'

        this.Valve5 = new Valve(new Point(768, 100), 30, 1, 50)
        this.addWidget(this.Valve5);
        this.Valve5.name = 'Y31'

        this.Valve6 = new Valve(new Point(860, 100), 30, 1, 50)
        this.addWidget(this.Valve6);
        this.Valve6.name = 'Y32'

        this.Valve7 = new Valve(new Point(952, 100), 30, 1, 50)
        this.addWidget(this.Valve7);
        this.Valve7.name = 'Y41'

        this.Valve8 = new Valve(new Point(1044, 100), 30, 1, 50)
        this.addWidget(this.Valve8);
        this.Valve8.name = 'Y42'

        this.Valve9 = new Valve(new Point(1136, 100), 30, 1, 50)
        this.addWidget(this.Valve9);
        this.Valve9.name = 'Y51'

        this.Valve10 = new Valve(new Point(1230, 100), 30, 1, 50)
        this.addWidget(this.Valve10);
        this.Valve10.name = 'Y52'

        this.Valve11 = new Valve(new Point(443, 280), 30, 0, 50)
        this.addWidget(this.Valve11);
        this.Valve11.name = 'Y13'

        this.Valve12 = new Valve(new Point(535, 190), 30, 0, 50)
        this.addWidget(this.Valve12);
        this.Valve12.name = 'Y14'

        this.Valve13 = new Valve(new Point(627, 280), 30, 0, 50)
        this.addWidget(this.Valve13);
        this.Valve13.name = 'Y23'

        this.Valve14 = new Valve(new Point(719, 190), 30, 0, 50)
        this.addWidget(this.Valve14);
        this.Valve14.name = 'Y24'

        this.Valve15 = new Valve(new Point(811, 280), 30, 0, 50)
        this.addWidget(this.Valve15);
        this.Valve15.name = 'Y33'

        this.Valve16 = new Valve(new Point(900, 190), 30, 0, 50)
        this.addWidget(this.Valve16);
        this.Valve16.name = 'Y34'

        this.Valve17 = new Valve(new Point(991, 280), 30, 0, 50)
        this.addWidget(this.Valve17);
        this.Valve17.name = 'Y43'

        this.Valve18 = new Valve(new Point(1084, 190), 30, 0, 50)
        this.addWidget(this.Valve18);
        this.Valve18.name = 'Y44'

        this.Valve19 = new Valve(new Point(1173, 280), 30, 0, 50)
        this.addWidget(this.Valve19);
        this.Valve19.name = 'Y53'

        this.Valve20 = new Valve(new Point(1268, 190), 30, 0, 50)
        this.addWidget(this.Valve20);
        this.Valve20.name = 'Y54'

        this.Valve21 = new Valve(new Point(485, 320), 30, 1, 50)
        this.addWidget(this.Valve21);
        this.Valve21.name = 'Y15'

        this.Valve22 = new Valve(new Point(667, 320), 30, 1, 50)
        this.addWidget(this.Valve22);
        this.Valve22.name = 'Y25'

        this.Valve23 = new Valve(new Point(850, 320), 30, 1, 50)
        this.addWidget(this.Valve23);
        this.Valve23.name = 'Y35'

        this.Valve24 = new Valve(new Point(1032, 320), 30, 1, 50)
        this.addWidget(this.Valve24);
        this.Valve24.name = 'Y45'

        this.Valve25 = new Valve(new Point(1215, 320), 30, 1, 50)
        this.addWidget(this.Valve25);
        this.Valve25.name = 'Y55'

        this.ValveCheck1 = new ValveCheck(new Point(443, 190), 30)
        this.addWidget(this.ValveCheck1);

        this.ValveCheck2 = new ValveCheck(new Point(627, 190), 30)
        this.addWidget(this.ValveCheck2);

        this.ValveCheck3 = new ValveCheck(new Point(811, 190), 30)
        this.addWidget(this.ValveCheck3);

        this.ValveCheck4 = new ValveCheck(new Point(991, 190), 30)
        this.addWidget(this.ValveCheck4);

        this.ValveCheck5 = new ValveCheck(new Point(1173, 190), 30)
        this.addWidget(this.ValveCheck5);

        this.ValveCheck6 = new ValveCheck(new Point(440, 480), 30)
        this.addWidget(this.ValveCheck6);

        this.ValveCheck7 = new ValveCheck(new Point(623, 480), 30)
        this.addWidget(this.ValveCheck7);

        this.ValveCheck8 = new ValveCheck(new Point(806, 480), 30)
        this.addWidget(this.ValveCheck8);

        this.ValveCheck9 = new ValveCheck(new Point(987, 480), 30)
        this.addWidget(this.ValveCheck9);

        this.ValveCheck10 = new ValveCheck(new Point(1169, 480), 30)
        this.addWidget(this.ValveCheck10);

        // this.UndegraundPump1 = new UndegraundPump(new Point(800, 300), 100, 0)
        // this.addWidget(this.UndegraundPump1);
    }
}