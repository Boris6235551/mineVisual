import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import {
    Conveyor, SeparatorRight, SeparatorLeft, ConeCrusher, Crush, Stone, BatcherLeft,
    BatcherRight, ArrowPointer, InformationTable, Pile,
} from './dsf'

import {Pool} from './pumpAccessories'

export class DSF extends Scheme {
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
    public SeparatorRight4: SeparatorRight;
    public BatcherRight1: BatcherRight;
    public BatcherRight2: BatcherRight;
    public ConeCrusher1: ConeCrusher;
    public ConeCrusher2: ConeCrusher;
    public ConeCrusher3: ConeCrusher;
    public ConeCrusher4: ConeCrusher;
    public Crush1: Crush;
    public Crush2: Crush;
    private ArrowPointer1: ArrowPointer;
    private ArrowPointer2: ArrowPointer;
    private ArrowPointer3: ArrowPointer;
    private ArrowPointer4: ArrowPointer;
    private ArrowPointer5: ArrowPointer;
    private ArrowPointer6: ArrowPointer;
    private ArrowPointer7: ArrowPointer;
    private ArrowPointer8: ArrowPointer;
    private ArrowPointer9: ArrowPointer;
    private ArrowPointer10: ArrowPointer;
    private ArrowPointer11: ArrowPointer;
    private ArrowPointer12: ArrowPointer;
    private ArrowPointer13: ArrowPointer;
    private InformationTable1: InformationTable;
    private InformationTable2: InformationTable;
    private InformationTable3: InformationTable;
    private InformationTable4: InformationTable;
    private InformationTable5: InformationTable;
    private InformationTable6: InformationTable;
    private InformationTable7: InformationTable;
    private InformationTable8: InformationTable;
    private Pile1: Pile;
    private Pile2: Pile;
    private Pile3: Pile;
    private Pile4: Pile;
    private Pile5: Pile;
    private Pile6: Pile;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'DSF';

        // 1. точка - верхний правый угол, длина - правая сторона 
        this.BatcherLeft1 = new BatcherLeft(new Point(323, 115), 20);
        this.addWidget(this.BatcherLeft1);
        this.BatcherLeft1.name = 'upFeederA';

        // 2. точка - верхний правый угол, длина - правая сторона 
        this.BatcherRight1 = new BatcherRight(new Point(337, 115), 20);
        this.addWidget(this.BatcherRight1);
        this.BatcherRight1.name = 'upFeederB'

        // 3. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft1 = new SeparatorLeft(new Point(285, 150), 50);
        this.addWidget(this.SeparatorLeft1);
        this.SeparatorLeft1.name = 'screenA'

        // 4. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorRight1 = new SeparatorRight(new Point(375, 150), 50);
        this.addWidget(this.SeparatorRight1);
        this.SeparatorRight1.name = 'screenB'

        // 6. точка - верхний правый угол, длина - правая сторона 
        this.BatcherRight2 = new BatcherRight(new Point(245, 240), 20);
        this.addWidget(this.BatcherRight2);
        this.BatcherRight2.name = 'downFeederA'

        // 7. точка - верхний правый угол, длина - правая сторона 
        this.BatcherLeft2 = new BatcherLeft(new Point(413, 240), 20);
        this.addWidget(this.BatcherLeft2);
        this.BatcherLeft2.name = 'downFeederB'

        // 8. точка (x,y), длина, высота
        let Conveyor1 = new Conveyor(new Point(240, 280), 50, 10);
        this.addWidget(Conveyor1);
        Conveyor1.name = 'conveyor1A'

        // 9. точка (x,y), длина, высота
        let Conveyor2 = new Conveyor(new Point(365, 280), 50, 10);
        this.addWidget(Conveyor2);
        Conveyor2.name = 'conveyor1B'

        // 5. точка (x,y), длина, высота
        let Conveyor3 = new Conveyor(new Point(450, 280), 120, 10);
        this.addWidget(Conveyor3);
        Conveyor3.name = 'boulderConveyor'

        // 10. левый верхний угол трапеции точка (x,y), высота трапеци
        this.Crush1 = new Crush(new Point(210, 320), 40);
        this.addWidget(this.Crush1);
        this.Crush1.name = 'jawCrusher1A'

        // 11. левый верхний угол трапеции точка (x,y), высота трапеци
        this.Crush2 = new Crush(new Point(405, 320), 40);
        this.addWidget(this.Crush2);
        this.Crush2.name = 'jawCrusher1B'

        // 12. точка (x,y), длина, высота
        let Conveyor4 = new Conveyor(new Point(190, 380), 50, 10);
        this.addWidget(Conveyor4);
        Conveyor4.name = 'conveyor2A'

        // 13. точка (x,y), длина, высота
        let Conveyor5 = new Conveyor(new Point(435, 380), 50, 10);
        this.addWidget(Conveyor5);
        Conveyor5.name = 'conveyor2B'

        // 14. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        this.ConeCrusher1 = new ConeCrusher(new Point(180, 430), 20);
        this.addWidget(this.ConeCrusher1);
        this.ConeCrusher1.name = 'coneCrusher2A'

        // 15. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        this.ConeCrusher2 = new ConeCrusher(new Point(495, 430), 20);
        this.addWidget(this.ConeCrusher2);
        this.ConeCrusher2.name = 'coneCrusher2B'

        // 16. точка (x,y), длина, высота
        let Conveyor6 = new Conveyor(new Point(155, 460), 70, 10);
        this.addWidget(Conveyor6);
        Conveyor6.name = 'conveyor3A'

        // 17. точка (x,y), длина, высота
        let Conveyor7 = new Conveyor(new Point(450, 460), 70, 10);
        this.addWidget(Conveyor7);
        Conveyor7.name = 'conveyor3B'

        // 18. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft2 = new SeparatorLeft(new Point(240, 485), 50);
        this.addWidget(this.SeparatorLeft2);
        this.SeparatorLeft2.name = 'screen1A'

        // 19. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorRight2 = new SeparatorRight(new Point(435, 485), 50);
        this.addWidget(this.SeparatorRight2);
        this.SeparatorRight2.name = 'screen1B'

        // 20. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        this.ConeCrusher3 = new ConeCrusher(new Point(220, 570), 20);
        this.addWidget(this.ConeCrusher3);
        this.ConeCrusher3.name = 'coneCrusher3A'

        // 21. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        this.ConeCrusher4 = new ConeCrusher(new Point(455, 570), 20);
        this.addWidget(this.ConeCrusher4);
        this.ConeCrusher4.name = 'coneCrusher3B'

        // 22. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorRight3 = new SeparatorRight(new Point(195, 600), 50);
        this.addWidget(this.SeparatorRight3);
        this.SeparatorRight3.name = 'screen2A'

        // 23. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorRight4 = new SeparatorRight(new Point(430, 600), 50);
        this.addWidget(this.SeparatorRight4);
        this.SeparatorRight4.name = 'screen2B'

        // 24. точка (x,y), длина, высота
        let Conveyor8 = new Conveyor(new Point(350, 700), 180, 10);
        this.addWidget(Conveyor8);
        Conveyor8.name = 'conveyor4'

        // 25. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft4 = new SeparatorLeft(new Point(350, 730), 50);
        this.addWidget(this.SeparatorLeft4);
        this.SeparatorLeft4.name = 'screen3'

        // 26. точка (x,y), длина, высота
        let Conveyor9 = new Conveyor(new Point(190, 795), 30, 10);
        this.addWidget(Conveyor9);
        Conveyor9.name = 'conveyor5'

        // 27. точка (x,y), длина, высота
        let Conveyor10 = new Conveyor(new Point(270, 795), 30, 10);
        this.addWidget(Conveyor10);
        Conveyor10.name = 'conveyor6'

        // 28. точка (x,y), длина, высота
        let Conveyor11 = new Conveyor(new Point(320, 795), 100, 10);
        this.addWidget(Conveyor11);
        Conveyor11.name = 'conveyor7'

        // 29. второй параметр задаёт длину динамической строны треугльника
        this.SeparatorLeft5 = new SeparatorLeft(new Point(190, 820), 50);
        this.addWidget(this.SeparatorLeft5);
        this.SeparatorLeft5.name = 'screen4'

        // 30. точка (x,y), длина, высота
        let Conveyor12 = new Conveyor(new Point(105, 885), 30, 10);
        this.addWidget(Conveyor12);
        Conveyor12.name = 'conveyor8'

        // 31. точка (x,y), длина, высота
        let Conveyor13 = new Conveyor(new Point(160, 885), 30, 10);
        this.addWidget(Conveyor13);
        Conveyor13.name = 'conveyor9'

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer1 = new ArrowPointer(new Point(480, 220), 258, 50, 'black');
        this.addWidget(this.ArrowPointer1);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer2 = new ArrowPointer(new Point(223, 175), -10, 38, 'black');
        this.addWidget(this.ArrowPointer2);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer3 = new ArrowPointer(new Point(437, 175), 10, 38, 'black');
        this.addWidget(this.ArrowPointer3);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer4 = new ArrowPointer(new Point(265, 200), 0, 45, '#FE982A');
        this.addWidget(this.ArrowPointer4);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer5 = new ArrowPointer(new Point(393, 200), 0, 45, '#FE982A');
        this.addWidget(this.ArrowPointer5);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer6 = new ArrowPointer(new Point(170, 676), -280, 20, 'black');
        this.addWidget(this.ArrowPointer6);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer7 = new ArrowPointer(new Point(215, 650), 0, 20, 'black');
        this.addWidget(this.ArrowPointer7);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer8 = new ArrowPointer(new Point(450, 650), 0, 20, 'black');
        this.addWidget(this.ArrowPointer8);////////////////////////////////////

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer9 = new ArrowPointer(new Point(492, 625), 10, 65, '#FE982A');
        this.addWidget(this.ArrowPointer9);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer10 = new ArrowPointer(new Point(380, 625), 133, 65, '#FE982A');
        this.addWidget(this.ArrowPointer10);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer11 = new ArrowPointer(new Point(298, 755), 0, 30, '#FE982A');
        this.addWidget(this.ArrowPointer11);

        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        this.ArrowPointer12 = new ArrowPointer(new Point(210, 762), -97, 23, 'black');
        this.addWidget(this.ArrowPointer12);

        let Pile1 = new Pile(new Point(575, 330), 60);
        this.addWidget(Pile1);

        let Pile2 = new Pile(new Point(170, 740), 60);
        this.addWidget(Pile2);

        let Pile3 = new Pile(new Point(100, 940), 60);
        this.addWidget(Pile3);

        let Pile4 = new Pile(new Point(195, 940), 60);
        this.addWidget(Pile4);

        let Pile5 = new Pile(new Point(265, 850), 60);
        this.addWidget(Pile5);

        let Pile6 = new Pile(new Point(425, 850), 60);
        this.addWidget(Pile6);

        let Pool1 = new Pool(new Point(700, 500), 200);
        this.addWidget(Pool1);


    }
}