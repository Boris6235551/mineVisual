"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSF = void 0;
var mine_drawing_1 = require("./mine_drawing");
var dsf_1 = require("./dsf");
var DSF = /** @class */ (function (_super) {
    __extends(DSF, _super);
    function DSF(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'DSF';
        //this.surfaceScheme = new Scheme('containerDSF', window.innerWidth * 0.25, window.innerHeight);
        var ReceivingHopper1 = new dsf_1.ReceivingHopper(new mine_drawing_1.Point(185, 0), 60);
        _this.addWidget(ReceivingHopper1);
        ReceivingHopper1.name = '';
        // 1. точка - верхний правый угол, длина - правая сторона 
        _this.BatcherLeft1 = new dsf_1.BatcherLeft(new mine_drawing_1.Point(200, 40), 20);
        _this.addWidget(_this.BatcherLeft1);
        _this.BatcherLeft1.name = 'upFeederA';
        // 2. точка - верхний правый угол, длина - правая сторона 
        _this.BatcherRight1 = new dsf_1.BatcherRight(new mine_drawing_1.Point(230, 40), 20);
        _this.addWidget(_this.BatcherRight1);
        _this.BatcherRight1.name = 'upFeederB';
        // 3. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft1 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(170, 80), 50);
        _this.addWidget(_this.SeparatorLeft1);
        _this.SeparatorLeft1.name = 'screenA';
        // 4. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorRight1 = new dsf_1.SeparatorRight(new mine_drawing_1.Point(260, 80), 50);
        _this.addWidget(_this.SeparatorRight1);
        _this.SeparatorRight1.name = 'screenB';
        // 6. точка - верхний правый угол, длина - правая сторона 
        _this.BatcherRight2 = new dsf_1.BatcherRight(new mine_drawing_1.Point(130, 140), 20);
        _this.addWidget(_this.BatcherRight2);
        _this.BatcherRight2.name = 'downFeederA';
        // 7. точка - верхний правый угол, длина - правая сторона 
        _this.BatcherLeft2 = new dsf_1.BatcherLeft(new mine_drawing_1.Point(295, 140), 20);
        _this.addWidget(_this.BatcherLeft2);
        _this.BatcherLeft2.name = 'downFeederB';
        // 8. точка (x,y), длина, высота
        var Conveyor1 = new dsf_1.Conveyor(new mine_drawing_1.Point(117, 180), 50, 10);
        _this.addWidget(Conveyor1);
        Conveyor1.name = 'conveyor1A';
        // 9. точка (x,y), длина, высота
        var Conveyor2 = new dsf_1.Conveyor(new mine_drawing_1.Point(255, 180), 50, 10);
        _this.addWidget(Conveyor2);
        Conveyor2.name = 'conveyor1B';
        // 5. точка (x,y), длина, высота
        var Conveyor3 = new dsf_1.Conveyor(new mine_drawing_1.Point(325, 180), 90, 10);
        _this.addWidget(Conveyor3);
        Conveyor3.name = 'boulderConveyor';
        // 10. левый верхний угол трапеции точка (x,y), высота трапеци
        _this.Crush1 = new dsf_1.Crush(new mine_drawing_1.Point(120, 230), 40);
        _this.addWidget(_this.Crush1);
        _this.Crush1.name = 'jawCrusher1A';
        // 11. левый верхний угол трапеции точка (x,y), высота трапеци
        _this.Crush2 = new dsf_1.Crush(new mine_drawing_1.Point(255, 230), 40);
        _this.addWidget(_this.Crush2);
        _this.Crush2.name = 'jawCrusher1B';
        // 12. точка (x,y), длина, высота
        var Conveyor4 = new dsf_1.Conveyor(new mine_drawing_1.Point(120, 280), 50, 10);
        _this.addWidget(Conveyor4);
        Conveyor4.name = 'conveyor2A';
        // 13. точка (x,y), длина, высота
        var Conveyor5 = new dsf_1.Conveyor(new mine_drawing_1.Point(255, 280), 50, 10);
        _this.addWidget(Conveyor5);
        Conveyor5.name = 'conveyor2B';
        // 14. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        _this.ConeCrusher1 = new dsf_1.ConeCrusher(new mine_drawing_1.Point(148, 330), 20);
        _this.addWidget(_this.ConeCrusher1);
        _this.ConeCrusher1.name = 'coneCrusher2A';
        // 15. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        _this.ConeCrusher2 = new dsf_1.ConeCrusher(new mine_drawing_1.Point(280, 330), 20);
        _this.addWidget(_this.ConeCrusher2);
        _this.ConeCrusher2.name = 'coneCrusher2B';
        // 16. точка (x,y), длина, высота
        var Conveyor6 = new dsf_1.Conveyor(new mine_drawing_1.Point(120, 360), 50, 10);
        _this.addWidget(Conveyor6);
        Conveyor6.name = 'conveyor3A';
        // 17. точка (x,y), длина, высота
        var Conveyor7 = new dsf_1.Conveyor(new mine_drawing_1.Point(255, 360), 50, 10);
        _this.addWidget(Conveyor7);
        Conveyor7.name = 'conveyor3B';
        // 18. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft2 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(150, 380), 50);
        _this.addWidget(_this.SeparatorLeft2);
        _this.SeparatorLeft2.name = 'screen1A';
        // 19. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorRight2 = new dsf_1.SeparatorRight(new mine_drawing_1.Point(273, 380), 50);
        _this.addWidget(_this.SeparatorRight2);
        _this.SeparatorRight2.name = 'screen1B';
        // 20. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        _this.ConeCrusher3 = new dsf_1.ConeCrusher(new mine_drawing_1.Point(130, 470), 20);
        _this.addWidget(_this.ConeCrusher3);
        _this.ConeCrusher3.name = 'coneCrusher3A';
        // 21. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        _this.ConeCrusher4 = new dsf_1.ConeCrusher(new mine_drawing_1.Point(293, 470), 20);
        _this.addWidget(_this.ConeCrusher4);
        _this.ConeCrusher4.name = 'coneCrusher3B';
        // 22. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft3 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(150, 500), 50);
        _this.addWidget(_this.SeparatorLeft3);
        _this.SeparatorLeft3.name = 'screen2A';
        // 23. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorRight3 = new dsf_1.SeparatorRight(new mine_drawing_1.Point(270, 500), 50);
        _this.addWidget(_this.SeparatorRight3);
        _this.SeparatorRight3.name = 'screen2B';
        // 24. точка (x,y), длина, высота
        var Conveyor8 = new dsf_1.Conveyor(new mine_drawing_1.Point(240, 560), 80, 10);
        _this.addWidget(Conveyor8);
        Conveyor8.name = 'conveyor4';
        // 25. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft4 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(250, 580), 50);
        _this.addWidget(_this.SeparatorLeft4);
        _this.SeparatorLeft4.name = 'screen3';
        // 26. точка (x,y), длина, высота
        var Conveyor9 = new dsf_1.Conveyor(new mine_drawing_1.Point(160, 640), 30, 10);
        _this.addWidget(Conveyor9);
        Conveyor9.name = 'conveyor5';
        // 27. точка (x,y), длина, высота
        var Conveyor10 = new dsf_1.Conveyor(new mine_drawing_1.Point(210, 640), 30, 10);
        _this.addWidget(Conveyor10);
        Conveyor10.name = 'conveyor6';
        // 28. точка (x,y), длина, высота
        var Conveyor11 = new dsf_1.Conveyor(new mine_drawing_1.Point(270, 640), 50, 10);
        _this.addWidget(Conveyor11);
        Conveyor11.name = 'conveyor7';
        // 29. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft5 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(160, 660), 50);
        _this.addWidget(_this.SeparatorLeft5);
        _this.SeparatorLeft5.name = 'screen4';
        // 30. точка (x,y), длина, высота
        var Conveyor12 = new dsf_1.Conveyor(new mine_drawing_1.Point(70, 720), 30, 10);
        _this.addWidget(Conveyor12);
        Conveyor12.name = 'conveyor8';
        // 31. точка (x,y), длина, высота
        var Conveyor13 = new dsf_1.Conveyor(new mine_drawing_1.Point(130, 720), 30, 10);
        _this.addWidget(Conveyor13);
        Conveyor13.name = 'conveyor9';
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
        _this.InformationTable1 = new dsf_1.InformationTable(new mine_drawing_1.Point(50, 350), 40);
        _this.addWidget(_this.InformationTable1);
        _this.InformationTable2 = new dsf_1.InformationTable(new mine_drawing_1.Point(340, 350), 40);
        _this.addWidget(_this.InformationTable2);
        _this.InformationTable3 = new dsf_1.InformationTable(new mine_drawing_1.Point(340, 550), 40);
        _this.addWidget(_this.InformationTable3);
        _this.InformationTable4 = new dsf_1.InformationTable(new mine_drawing_1.Point(340, 630), 40);
        _this.addWidget(_this.InformationTable4);
        _this.InformationTable5 = new dsf_1.InformationTable(new mine_drawing_1.Point(100, 630), 40);
        _this.addWidget(_this.InformationTable5);
        _this.InformationTable6 = new dsf_1.InformationTable(new mine_drawing_1.Point(205, 660), 40);
        _this.addWidget(_this.InformationTable6);
        _this.InformationTable7 = new dsf_1.InformationTable(new mine_drawing_1.Point(65, 740), 40);
        _this.addWidget(_this.InformationTable7);
        _this.InformationTable8 = new dsf_1.InformationTable(new mine_drawing_1.Point(125, 740), 40);
        _this.addWidget(_this.InformationTable8);
        return _this;
        //animateScheme(this.surfaceScheme, 500);
    }
    return DSF;
}(mine_drawing_1.Scheme));
exports.DSF = DSF;
//# sourceMappingURL=_dsf.js.map