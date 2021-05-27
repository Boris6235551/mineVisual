import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import {
    Conveyor, SeparatorRight, SeparatorLeft, ConeCrusher, Crush, Stone, BatcherLeft,
    BatcherRight, ReceivingHopper, ArrowPointerRight, ArrowPointerLeft, InformationTable
} from './dsf'

export class DSF extends Scheme {
    private surfaceScheme: Scheme
    public BatcherLeft1: BatcherLeft;
    public BatcherLeft2: BatcherLeft;
    public SeparatorLeft1: SeparatorLeft;
    public SeparatorLeft2: SeparatorLeft;
    public SeparatorLeft3: SeparatorLeft;
    public SeparatorLeft4: SeparatorLeft;
    public SeparatorLeft5: SeparatorLeft;
    public SeparatorRight1: SeparatorRight;
    public SeparatorRight2: SeparatorRight;
    public SeparatorRight3: SeparatorRight;
    public BatcherRight1: BatcherRight;
    public BatcherRight2: BatcherRight;
    public ConeCrusher1: ConeCrusher;
    public ConeCrusher2: ConeCrusher;
    public ConeCrusher3: ConeCrusher;
    public ConeCrusher4: ConeCrusher;
    public Crush1: Crush;
    public Crush2: Crush;
    private ArrowPointerRight1: ArrowPointerRight;
    private ArrowPointerLeft1: ArrowPointerLeft;
    private ArrowPointerLeft2: ArrowPointerLeft;
    private ArrowPointerLeft3: ArrowPointerLeft;
    private ArrowPointerLeft4: ArrowPointerLeft;
    private ArrowPointerLeft5: ArrowPointerLeft;
    private ArrowPointerLeft6: ArrowPointerLeft;
    private ArrowPointerLeft7: ArrowPointerLeft;
    private ArrowPointerLeft8: ArrowPointerLeft;
    private ArrowPointerLeft9: ArrowPointerLeft;
    private ArrowPointerLeft10: ArrowPointerLeft;
    private ArrowPointerLeft11: ArrowPointerLeft;
    private ArrowPointerLeft12: ArrowPointerLeft;
    private ArrowPointerLeft13: ArrowPointerLeft;
    private ArrowPointerLeft14: ArrowPointerLeft;
    private ArrowPointerLeft15: ArrowPointerLeft;
    private ArrowPointerLeft16: ArrowPointerLeft;
    private ArrowPointerLeft17: ArrowPointerLeft;
    private ArrowPointerLeft18: ArrowPointerLeft;
    private ArrowPointerLeft19: ArrowPointerLeft;
    private ArrowPointerLeft20: ArrowPointerLeft;
    private ArrowPointerLeft21: ArrowPointerLeft;
    private ArrowPointerLeft22: ArrowPointerLeft;
    private InformationTable1: InformationTable;
    private InformationTable2: InformationTable;
    private InformationTable3: InformationTable;
    private InformationTable4: InformationTable;
    private InformationTable5: InformationTable;
    private InformationTable6: InformationTable;
    private InformationTable7: InformationTable;
    private InformationTable8: InformationTable;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        //this.surfaceScheme = new Scheme('containerDSF', window.innerWidth * 0.25, window.innerHeight);

        let ReceivingHopper1 = new ReceivingHopper(new Point(185, 0), 60);
        this.addWidget(ReceivingHopper1);
        ReceivingHopper1.name = ''

        // 1. точка - верхний правый угол, длина - правая сторона 
        this.BatcherLeft1 = new BatcherLeft(new Point(200, 40), 20);
        this.addWidget(this.BatcherLeft1);
        this.BatcherLeft1.name = 'upFeederA';
        this.BatcherLeft1.setBaseProperty({ bit: true, byte: 1, word: 4 })


        // 2. точка - верхний правый угол, длина - правая сторона 
        this.BatcherRight1 = new BatcherRight(new Point(230, 40), 20);
        this.addWidget(this.BatcherRight1);
        this.BatcherRight1.name = 'upFeederB'
        this.BatcherRight1.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 3. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft1 = new SeparatorLeft(new Point(170, 80), 50);
        this.addWidget(this.SeparatorLeft1);
        this.SeparatorLeft1.name = 'screenA'
        this.SeparatorLeft1.setBaseProperty({ bit: false, byte: 1, word: 4 })

        // 4. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorRight1 = new SeparatorRight(new Point(260, 80), 50);
        this.addWidget(this.SeparatorRight1);
        this.SeparatorRight1.name = 'screenB'
        this.SeparatorRight1.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 6. точка - верхний правый угол, длина - правая сторона 
        this.BatcherRight2 = new BatcherRight(new Point(130, 140), 20);
        this.addWidget(this.BatcherRight2);
        this.BatcherRight2.name = 'downFeederA'
        this.BatcherRight2.setBaseProperty({ bit: false, byte: 1, word: 4 })

        // 7. точка - верхний правый угол, длина - правая сторона 
        this.BatcherLeft2 = new BatcherLeft(new Point(295, 140), 20);
        this.addWidget(this.BatcherLeft2);
        this.BatcherLeft2.name = 'downFeederB'
        this.BatcherLeft2.setBaseProperty({ bit: false, byte: 1, word: 4 })

        // 8. точка (x,y), длина, высота
        let Conveyor1 = new Conveyor(new Point(117, 180), 50, 10);
        this.addWidget(Conveyor1);
        Conveyor1.name = 'conveyor1A'

        // 9. точка (x,y), длина, высота
        let Conveyor2 = new Conveyor(new Point(255, 180), 50, 10);
        this.addWidget(Conveyor2);
        Conveyor2.name = 'conveyor1B'

        // 5. точка (x,y), длина, высота
        let Conveyor3 = new Conveyor(new Point(325, 180), 90, 10);
        this.addWidget(Conveyor3);
        Conveyor3.name = 'boulderConveyor'

        // 10. левый верхний угол трапеции точка (x,y), высота трапеци
        this.Crush1 = new Crush(new Point(120, 230), 40);
        this.addWidget(this.Crush1);
        this.Crush1.name = 'jawCrusher1A'
        this.Crush1.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 11. левый верхний угол трапеции точка (x,y), высота трапеци
        this.Crush2 = new Crush(new Point(255, 230), 40);
        this.addWidget(this.Crush2);
        this.Crush2.name = 'jawCrusher1B'
        this.Crush2.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 12. точка (x,y), длина, высота
        let Conveyor4 = new Conveyor(new Point(120, 280), 50, 10);
        this.addWidget(Conveyor4);
        Conveyor4.name = 'conveyor2A'

        // 13. точка (x,y), длина, высота
        let Conveyor5 = new Conveyor(new Point(255, 280), 50, 10);
        this.addWidget(Conveyor5);
        Conveyor5.name = 'conveyor2B'

        // 14. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        this.ConeCrusher1 = new ConeCrusher(new Point(148, 330), 20);
        this.addWidget(this.ConeCrusher1);
        this.ConeCrusher1.name = 'coneCrusher2A'
        this.ConeCrusher1.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 15. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        this.ConeCrusher2 = new ConeCrusher(new Point(280, 330), 20);
        this.addWidget(this.ConeCrusher2);
        this.ConeCrusher2.name = 'coneCrusher2B'
        this.ConeCrusher2.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 16. точка (x,y), длина, высота
        let Conveyor6 = new Conveyor(new Point(120, 360), 50, 10);
        this.addWidget(Conveyor6);
        Conveyor6.name = 'conveyor3A'

        // 17. точка (x,y), длина, высота
        let Conveyor7 = new Conveyor(new Point(255, 360), 50, 10);
        this.addWidget(Conveyor7);
        Conveyor7.name = 'conveyor3B'

        // 18. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft2 = new SeparatorLeft(new Point(150, 380), 50);
        this.addWidget(this.SeparatorLeft2);
        this.SeparatorLeft2.name = 'screen1A'
        this.SeparatorLeft2.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 19. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorRight2 = new SeparatorRight(new Point(273, 380), 50);
        this.addWidget(this.SeparatorRight2);
        this.SeparatorRight2.name = 'screen1B'
        this.SeparatorRight2.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 20. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        this.ConeCrusher3 = new ConeCrusher(new Point(130, 470), 20);
        this.addWidget(this.ConeCrusher3);
        this.ConeCrusher3.name = 'coneCrusher3A'
        this.ConeCrusher3.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 21. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        this.ConeCrusher4 = new ConeCrusher(new Point(293, 470), 20);
        this.addWidget(this.ConeCrusher4);
        this.ConeCrusher4.name = 'coneCrusher3B'
        this.ConeCrusher4.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 22. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft3 = new SeparatorLeft(new Point(150, 500), 50);
        this.addWidget(this.SeparatorLeft3);
        this.SeparatorLeft3.name = 'screen2A'
        this.SeparatorLeft3.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 23. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorRight3 = new SeparatorRight(new Point(270, 500), 50);
        this.addWidget(this.SeparatorRight3);
        this.SeparatorRight3.name = 'screen2B'
        this.SeparatorRight3.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 24. точка (x,y), длина, высота
        let Conveyor8 = new Conveyor(new Point(240, 560), 80, 10);
        this.addWidget(Conveyor8);
        Conveyor8.name = 'conveyor4'

        // 25. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft4 = new SeparatorLeft(new Point(250, 580), 50);
        this.addWidget(this.SeparatorLeft4);
        this.SeparatorLeft4.name = 'screen3'
        this.SeparatorLeft4.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 26. точка (x,y), длина, высота
        let Conveyor9 = new Conveyor(new Point(160, 640), 30, 10);
        this.addWidget(Conveyor9);
        Conveyor9.name = 'conveyor5'

        // 27. точка (x,y), длина, высота
        let Conveyor10 = new Conveyor(new Point(210, 640), 30, 10);
        this.addWidget(Conveyor10);
        Conveyor10.name = 'conveyor6'

        // 28. точка (x,y), длина, высота
        let Conveyor11 = new Conveyor(new Point(270, 640), 50, 10);
        this.addWidget(Conveyor11);
        Conveyor11.name = 'conveyor7'

        // 29. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft5 = new SeparatorLeft(new Point(160, 660), 50);
        this.addWidget(this.SeparatorLeft5);
        this.SeparatorLeft5.name = 'screen4'
        this.SeparatorLeft5.setBaseProperty({ bit: true, byte: 1, word: 4 })

        // 30. точка (x,y), длина, высота
        let Conveyor12 = new Conveyor(new Point(70, 720), 30, 10);
        this.addWidget(Conveyor12);
        Conveyor12.name = 'conveyor8'

        // 31. точка (x,y), длина, высота
        let Conveyor13 = new Conveyor(new Point(130, 720), 30, 10);
        this.addWidget(Conveyor13);
        Conveyor13.name = 'conveyor9'

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerRight1 = new ArrowPointerRight(new Point(390, 135), 240, 35);
        // this.surfaceScheme.addWidget(this.ArrowPointerRight1);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft1 = new ArrowPointerLeft(new Point(120, 110), 0, 40);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft1);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft2 = new ArrowPointerLeft(new Point(310, 110), 0, 40);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft2);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft3 = new ArrowPointerLeft(new Point(185, 160), 0, 30);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft3);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft4 = new ArrowPointerLeft(new Point(237, 160), 0, 30);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft4);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft5 = new ArrowPointerLeft(new Point(120, 195), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft5);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft6 = new ArrowPointerLeft(new Point(310, 195), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft6);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft7 = new ArrowPointerLeft(new Point(100, 250), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft7);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft8 = new ArrowPointerLeft(new Point(240, 250), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft8);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft9 = new ArrowPointerLeft(new Point(100, 300), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft9);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft10 = new ArrowPointerLeft(new Point(240, 300), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft10);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft11 = new ArrowPointerLeft(new Point(185, 340), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft11);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft12 = new ArrowPointerLeft(new Point(240, 340), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft12);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft13 = new ArrowPointerLeft(new Point(185, 380), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft13);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft14 = new ArrowPointerLeft(new Point(240, 380), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft14);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft15 = new ArrowPointerLeft(new Point(185, 420), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft15);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft16 = new ArrowPointerLeft(new Point(240, 420), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft16);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft17 = new ArrowPointerLeft(new Point(185, 470), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft17);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft18 = new ArrowPointerLeft(new Point(240, 470), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft18);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft19 = new ArrowPointerLeft(new Point(240, 530), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft19);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft20 = new ArrowPointerLeft(new Point(210, 570), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft20);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft21 = new ArrowPointerLeft(new Point(150, 610), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft21);

        // // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        // this.ArrowPointerLeft22 = new ArrowPointerLeft(new Point(90, 660), 0, 15);
        // this.surfaceScheme.addWidget(this.ArrowPointerLeft22);

        this.InformationTable1 = new InformationTable(new Point(50, 350), 40);
        this.addWidget(this.InformationTable1);

        this.InformationTable2 = new InformationTable(new Point(340, 350), 40);
        this.addWidget(this.InformationTable2);

        this.InformationTable3 = new InformationTable(new Point(340, 550), 40);
        this.addWidget(this.InformationTable3);

        this.InformationTable4 = new InformationTable(new Point(340, 630), 40);
        this.addWidget(this.InformationTable4);

        this.InformationTable5 = new InformationTable(new Point(100, 630), 40);
        this.addWidget(this.InformationTable5);

        this.InformationTable6 = new InformationTable(new Point(205, 660), 40);
        this.addWidget(this.InformationTable6);

        this.InformationTable7 = new InformationTable(new Point(65, 740), 40);
        this.addWidget(this.InformationTable7);

        this.InformationTable8 = new InformationTable(new Point(125, 740), 40);
        this.addWidget(this.InformationTable8);

        //animateScheme(this.surfaceScheme, 500);
    }
}