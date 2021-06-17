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
var pumpAccessories_1 = require("./pumpAccessories");
var DSF = /** @class */ (function (_super) {
    __extends(DSF, _super);
    function DSF(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'DSF';
        // 1. точка - верхний правый угол, длина - правая сторона 
        _this.BatcherLeft1 = new dsf_1.BatcherLeft(new mine_drawing_1.Point(323, 115), 20);
        _this.addWidget(_this.BatcherLeft1);
        _this.BatcherLeft1.name = 'upFeederA';
        // 2. точка - верхний правый угол, длина - правая сторона 
        _this.BatcherRight1 = new dsf_1.BatcherRight(new mine_drawing_1.Point(337, 115), 20);
        _this.addWidget(_this.BatcherRight1);
        _this.BatcherRight1.name = 'upFeederB';
        // 3. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft1 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(285, 150), 50);
        _this.addWidget(_this.SeparatorLeft1);
        _this.SeparatorLeft1.name = 'screenA';
        // 4. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorRight1 = new dsf_1.SeparatorRight(new mine_drawing_1.Point(375, 150), 50);
        _this.addWidget(_this.SeparatorRight1);
        _this.SeparatorRight1.name = 'screenB';
        // 6. точка - верхний правый угол, длина - правая сторона 
        _this.BatcherRight2 = new dsf_1.BatcherRight(new mine_drawing_1.Point(245, 240), 20);
        _this.addWidget(_this.BatcherRight2);
        _this.BatcherRight2.name = 'downFeederA';
        // 7. точка - верхний правый угол, длина - правая сторона 
        _this.BatcherLeft2 = new dsf_1.BatcherLeft(new mine_drawing_1.Point(413, 240), 20);
        _this.addWidget(_this.BatcherLeft2);
        _this.BatcherLeft2.name = 'downFeederB';
        // 8. точка (x,y), длина, высота
        var Conveyor1 = new dsf_1.Conveyor(new mine_drawing_1.Point(240, 280), 50, 10);
        _this.addWidget(Conveyor1);
        Conveyor1.name = 'conveyor1A';
        // 9. точка (x,y), длина, высота
        var Conveyor2 = new dsf_1.Conveyor(new mine_drawing_1.Point(365, 280), 50, 10);
        _this.addWidget(Conveyor2);
        Conveyor2.name = 'conveyor1B';
        // 5. точка (x,y), длина, высота
        var Conveyor3 = new dsf_1.Conveyor(new mine_drawing_1.Point(450, 280), 120, 10);
        _this.addWidget(Conveyor3);
        Conveyor3.name = 'boulderConveyor';
        // 10. левый верхний угол трапеции точка (x,y), высота трапеци
        _this.Crush1 = new dsf_1.Crush(new mine_drawing_1.Point(210, 320), 40);
        _this.addWidget(_this.Crush1);
        _this.Crush1.name = 'jawCrusher1A';
        // 11. левый верхний угол трапеции точка (x,y), высота трапеци
        _this.Crush2 = new dsf_1.Crush(new mine_drawing_1.Point(405, 320), 40);
        _this.addWidget(_this.Crush2);
        _this.Crush2.name = 'jawCrusher1B';
        // 12. точка (x,y), длина, высота
        var Conveyor4 = new dsf_1.Conveyor(new mine_drawing_1.Point(190, 380), 50, 10);
        _this.addWidget(Conveyor4);
        Conveyor4.name = 'conveyor2A';
        // 13. точка (x,y), длина, высота
        var Conveyor5 = new dsf_1.Conveyor(new mine_drawing_1.Point(435, 380), 50, 10);
        _this.addWidget(Conveyor5);
        Conveyor5.name = 'conveyor2B';
        // 14. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        _this.ConeCrusher1 = new dsf_1.ConeCrusher(new mine_drawing_1.Point(180, 430), 20);
        _this.addWidget(_this.ConeCrusher1);
        _this.ConeCrusher1.name = 'coneCrusher2A';
        // 15. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        _this.ConeCrusher2 = new dsf_1.ConeCrusher(new mine_drawing_1.Point(495, 430), 20);
        _this.addWidget(_this.ConeCrusher2);
        _this.ConeCrusher2.name = 'coneCrusher2B';
        // 16. точка (x,y), длина, высота
        var Conveyor6 = new dsf_1.Conveyor(new mine_drawing_1.Point(155, 460), 70, 10);
        _this.addWidget(Conveyor6);
        Conveyor6.name = 'conveyor3A';
        // 17. точка (x,y), длина, высота
        var Conveyor7 = new dsf_1.Conveyor(new mine_drawing_1.Point(450, 460), 70, 10);
        _this.addWidget(Conveyor7);
        Conveyor7.name = 'conveyor3B';
        // 18. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft2 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(240, 485), 50);
        _this.addWidget(_this.SeparatorLeft2);
        _this.SeparatorLeft2.name = 'screen1A';
        // 19. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorRight2 = new dsf_1.SeparatorRight(new mine_drawing_1.Point(435, 485), 50);
        _this.addWidget(_this.SeparatorRight2);
        _this.SeparatorRight2.name = 'screen1B';
        // 20. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        _this.ConeCrusher3 = new dsf_1.ConeCrusher(new mine_drawing_1.Point(220, 570), 20);
        _this.addWidget(_this.ConeCrusher3);
        _this.ConeCrusher3.name = 'coneCrusher3A';
        // 21. Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
        _this.ConeCrusher4 = new dsf_1.ConeCrusher(new mine_drawing_1.Point(455, 570), 20);
        _this.addWidget(_this.ConeCrusher4);
        _this.ConeCrusher4.name = 'coneCrusher3B';
        // 22. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorRight3 = new dsf_1.SeparatorRight(new mine_drawing_1.Point(195, 600), 50);
        _this.addWidget(_this.SeparatorRight3);
        _this.SeparatorRight3.name = 'screen2A';
        // 23. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorRight4 = new dsf_1.SeparatorRight(new mine_drawing_1.Point(430, 600), 50);
        _this.addWidget(_this.SeparatorRight4);
        _this.SeparatorRight4.name = 'screen2B';
        // 24. точка (x,y), длина, высота
        var Conveyor8 = new dsf_1.Conveyor(new mine_drawing_1.Point(350, 700), 180, 10);
        _this.addWidget(Conveyor8);
        Conveyor8.name = 'conveyor4';
        // 25. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft4 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(350, 730), 50);
        _this.addWidget(_this.SeparatorLeft4);
        _this.SeparatorLeft4.name = 'screen3';
        // 26. точка (x,y), длина, высота
        var Conveyor9 = new dsf_1.Conveyor(new mine_drawing_1.Point(190, 795), 30, 10);
        _this.addWidget(Conveyor9);
        Conveyor9.name = 'conveyor5';
        // 27. точка (x,y), длина, высота
        var Conveyor10 = new dsf_1.Conveyor(new mine_drawing_1.Point(270, 795), 30, 10);
        _this.addWidget(Conveyor10);
        Conveyor10.name = 'conveyor6';
        // 28. точка (x,y), длина, высота
        var Conveyor11 = new dsf_1.Conveyor(new mine_drawing_1.Point(320, 795), 100, 10);
        _this.addWidget(Conveyor11);
        Conveyor11.name = 'conveyor7';
        // 29. второй параметр задаёт длину динамической строны треугльника
        _this.SeparatorLeft5 = new dsf_1.SeparatorLeft(new mine_drawing_1.Point(190, 820), 50);
        _this.addWidget(_this.SeparatorLeft5);
        _this.SeparatorLeft5.name = 'screen4';
        // 30. точка (x,y), длина, высота
        var Conveyor12 = new dsf_1.Conveyor(new mine_drawing_1.Point(105, 885), 30, 10);
        _this.addWidget(Conveyor12);
        Conveyor12.name = 'conveyor8';
        // 31. точка (x,y), длина, высота
        var Conveyor13 = new dsf_1.Conveyor(new mine_drawing_1.Point(160, 885), 30, 10);
        _this.addWidget(Conveyor13);
        Conveyor13.name = 'conveyor9';
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer1 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(480, 220), 258, 50, 'black');
        _this.addWidget(_this.ArrowPointer1);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer2 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(223, 175), -10, 38, 'black');
        _this.addWidget(_this.ArrowPointer2);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer3 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(437, 175), 10, 38, 'black');
        _this.addWidget(_this.ArrowPointer3);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer4 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(265, 200), 0, 45, '#FE982A');
        _this.addWidget(_this.ArrowPointer4);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer5 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(393, 200), 0, 45, '#FE982A');
        _this.addWidget(_this.ArrowPointer5);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer6 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(170, 676), -280, 20, 'black');
        _this.addWidget(_this.ArrowPointer6);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer7 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(215, 650), 0, 20, 'black');
        _this.addWidget(_this.ArrowPointer7);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer8 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(450, 650), 0, 20, 'black');
        _this.addWidget(_this.ArrowPointer8); ////////////////////////////////////
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer9 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(492, 625), 10, 65, '#FE982A');
        _this.addWidget(_this.ArrowPointer9);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer10 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(380, 625), 133, 65, '#FE982A');
        _this.addWidget(_this.ArrowPointer10);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer11 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(298, 755), 0, 30, '#FE982A');
        _this.addWidget(_this.ArrowPointer11);
        // Point - общая точка двух линий, длина горизонтальной линии, высота вертикальной линии
        _this.ArrowPointer12 = new dsf_1.ArrowPointer(new mine_drawing_1.Point(210, 762), -97, 23, 'black');
        _this.addWidget(_this.ArrowPointer12);
        var Pile1 = new dsf_1.Pile(new mine_drawing_1.Point(575, 330), 60);
        _this.addWidget(Pile1);
        var Pile2 = new dsf_1.Pile(new mine_drawing_1.Point(170, 740), 60);
        _this.addWidget(Pile2);
        var Pile3 = new dsf_1.Pile(new mine_drawing_1.Point(100, 940), 60);
        _this.addWidget(Pile3);
        var Pile4 = new dsf_1.Pile(new mine_drawing_1.Point(195, 940), 60);
        _this.addWidget(Pile4);
        var Pile5 = new dsf_1.Pile(new mine_drawing_1.Point(265, 850), 60);
        _this.addWidget(Pile5);
        var Pile6 = new dsf_1.Pile(new mine_drawing_1.Point(425, 850), 60);
        _this.addWidget(Pile6);
        var Pool1 = new pumpAccessories_1.Pool(new mine_drawing_1.Point(700, 500), 200);
        _this.addWidget(Pool1);
        return _this;
    }
    return DSF;
}(mine_drawing_1.Scheme));
exports.DSF = DSF;
//# sourceMappingURL=_dsf.js.map