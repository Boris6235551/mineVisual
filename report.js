// const datepicker = require('vuejs-datepicker');
// import datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.js';
const moment = require('moment');
const ipcAdmin = require('electron').ipcRenderer;
const { connectDB, getShift, getShifts, getShiftBatchers, getFractions } = require('../BatcherWatcher/DB/db')
const numeral = require('numeral');
const { ipcRenderer } = require('electron');

// let fractionReport = await getFractions('2021-06-02', '2021-06-03');

ipcRenderer.on('reportValue', (event, arg) => {
    report.reportValue = arg;
    if (arg == 'fractions') {
        report.count = 1;
        report.report.height = "272mm";
    }
});

function numberWithSpaces(number) {
    if (report.reportValue == 'fractions') return numeral(number).format('1,000.12');
    if (report.reportValue == 'shifts') {
        let numberString = numeral(number).format('1 000.12');
        return numberString.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
}

(function () {
    /**
     * Корректировка округления десятичных дробей.
     *
     * @param {String}  type  Тип корректировки.
     * @param {Number}  value Число.
     * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
     * @returns {Number} Скорректированное значение.
     */
    function decimalAdjust(type, value, exp) {
        // Если степень не определена, либо равна нулю...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Сдвиг разрядов
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Обратный сдвиг
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
    // Десятичное округление к ближайшему
    // if (!Math.round10) {
    Math.round10 = function (value, exp) {
        return decimalAdjust('round', value, exp);
    };
    // }
    // Десятичное округление вниз
    // if (!Math.floor10) {
    //     Math.floor10 = function (value, exp) {
    //         return decimalAdjust('floor', value, exp);
    //     };
    // }
    // Десятичное округление вверх
    // if (!Math.ceil10) {
    //     Math.ceil10 = function (value, exp) {
    //         return decimalAdjust('ceil', value, exp);
    //     };
    // }
})();

function getEmptyShift() {
    return {
        beginDate: '',
        endDate: '',
        skips: 0,
        weight: '',
        datas: []
    };
}

// const tbody = document.getElementById('report')
// tbody.style.setProperty('--content35', '12')



/*{beginDate: '06/03/2021 12:34:12 PM', endDate: '06/03/2021 12:40:12 PM',
    skips: '10', weight: '498',
    datas: [{ batcher: "L Skip", number: "3", gross: "10310", tare: "350", 
                net: 9960, time: "2021-06-02 10:44:08" },]
}*/

let report = new Vue({
    el: '#report',
    data: {
        objectShift: getEmptyShift(),
        objFractions: {},
        objFractionsPercentage: {},
        startDate: new moment().format('YYYY-MM-DD'),    //"2021-06-16"
        endDate: new moment().format('YYYY-MM-DD'),
        shifts: ['no shifts found'],    // all shifts from period
        selectShifts: 'no shifts found',
        datePrintingReport: { year: new Date().getFullYear(), day: new Date().getDate(), month: new Date().getMonth() + 1 },
        count: '',
        report: {
            height: '822mm',
        },
        reportValue: ''
    },
    methods: {
        selectShiftChange: async function (e) {
            // console.log('selectShiftChange: async function', this.selectShifts)
            this.setShiftParams(this.selectShifts);
        },
        checkAndSetPeriod: async function () {
            let fm = moment(this.startDate).hour(0).minute(0).second(0);
            let tm = moment(this.endDate).hour(23).minute(59).second(59);
            if (tm.isBefore(fm)) {
                tm = moment(this.startDate).hour(23).minute(59).second(59);
                this.endDate = tm.format('YYYY-MM-DD');
            }
            // console.log(`checkAndSetPeriod fm=${fm.format('YYYY-MM-DD HH:mm:ss')}; tm=${tm.format('YYYY-MM-DD HH:mm:ss')}`);
            if (await connectDB(true)) {
                if (this.reportValue == 'fractions') {
                    this.objFractions = await getFractions('2021-06-02', '2021-06-03')
                    // this.objectShift.beginDate = this.objFractions.begin;
                    // this.objectShift.endDate = this.objFractions.end;
                    this.objectShift.skips = this.objFractions.skips;
                    this.objFractions.dust = this.objFractions.dust / 100;
                    this.objFractions.fract5_20 = this.objFractions.fract5_20 / 100;
                    this.objFractions.fract20_40 = this.objFractions.fract20_40 / 100;
                    this.objFractions.fract40_60 = this.objFractions.fract40_60 / 100;
                    this.objFractions.fract60_80 = this.objFractions.fract60_80 / 100;
                    this.objFractions.boulder = this.objFractions.boulder / 100;
                    this.objFractions.weight = this.objFractions.weight / 100;
                    this.objFractionsPercentage.dust = Math.round10(this.objFractions.dust / this.objFractions.weight * 100, -1) + "%"
                    this.objFractionsPercentage.fract5_20 = Math.round10(this.objFractions.fract5_20 / this.objFractions.weight * 100, -1) + "%"
                    this.objFractionsPercentage.fract20_40 = Math.round10(this.objFractions.fract20_40 / this.objFractions.weight * 100, -1) + "%"
                    this.objFractionsPercentage.fract40_60 = Math.round10(this.objFractions.fract40_60 / this.objFractions.weight * 100, -1) + "%"
                    this.objFractionsPercentage.fract60_80 = Math.round10(this.objFractions.fract60_80 / this.objFractions.weight * 100, -1) + "%"
                    this.objFractionsPercentage.boulder = Math.round10(this.objFractions.boulder / this.objFractions.weight * 100, -1) + "%"
                    this.objectShift.weight = numberWithSpaces(this.objFractions.weight);
                }
                else {
                    let shifts = await getShifts(fm.format("YYYY-MM-DD HH:mm:ss"), tm.format("YYYY-MM-DD HH:mm:ss"));
                    // console.log(`checkAndSetPeriod shifts = `, JSON.stringify(shifts))

                    //{"beginDate":"2021-06-02T19:23:35.000Z","endDate":"2021-06-03T01:49:48.000Z","skips":4,"weight":39590,"reserved":1}
                    if (shifts.length) {
                        this.shifts = shifts.map((shift) => {
                            let m = new moment(shift.beginDate).format("YYYY-MM-DD HH:mm:ss")
                            // console.log('checkAndSetPeriod new moment(shift)', m)
                            return m;
                        });
                        this.selectShifts = this.shifts[0]; // begin date
                        this.setShiftParams(this.shifts[0], shifts[0]);
                    }
                    else {
                        this.shifts = ['no shifts found'];
                        this.selectShifts = 'no shifts found';
                    }
                }
            }
        },
        setShiftParams: async function (sBeginDate, shift = null) {
            this.objectShift = getEmptyShift();
            if (shift == null) {
                shift = await getShift(sBeginDate);
            }
            if (shift == null) return;
            // if (shift != null) {
            let datas = await getShiftBatchers(sBeginDate);
            let i = 1;
            datas = datas.map((d) => {
                return { ...d, time: new moment(d.time).format("YYYY-MM-DD HH:mm:ss"), index: i++ };
            });
            let endDate = (shift.endDate != null) ? (new moment(shift.endDate).format("YYYY-MM-DD HH:mm:ss")) : ('');
            let shiftWeight = numberWithSpaces(shift.weight / 1000);
            this.objectShift = { ...shift, weight: shiftWeight, beginDate: sBeginDate, endDate: endDate, datas: datas };
            // }
            // счётчик количества страниц
            if (this.reportValue == 'shifts') {
                this.count = this.objectShift.datas.length;
                console.log(this.count)
                if (this.count == 35 || this.count == 82 || this.count == 129 || this.count == 176 || this.count == 223 || this.count == 270 || this.count == 317)
                    this.count = ''
                else {
                    this.count = Math.trunc((this.count - 35) / 47) + 2;
                    this.report.height = this.count * 272 + 'mm'
                }
            }

            console.log(JSON.stringify(this.objectShift))

            // this.objectShift = testData;

            // this.count = this.objectShift.datas.length;
            // if (this.count == 35 || this.count == 82 || this.count == 129 || this.count == 176 || this.count == 223 || this.count == 270 || this.count == 317)
            //     this.count = ''
            // else {
            //     this.count = Math.trunc((this.count - 35) / 47) + 2;
            //     this.report.height = this.count * 274 + 'mm'
            // }
            // console.log(`@@@@@@@@@@@@@@@@@@@@@@@@ count=${this.count}; report height=${this.report.height}` )
        },
        close: function () {
            window.close();
        },
        print: function () {
            console.log(`@@@@@@@@@@@@@@@@@@@@@@@@ count=${this.count}; report height=${this.report.height}`)
            window.print();
        },
        fromDateChange: function (e) {    // startDate = "2021-06-16"; type string
            this.checkAndSetPeriod();
            // console.log(`event = ${e}; startDate = ${JSON.stringify(this.startDate)}; endDate = ${this.endDate}}`)
        },
        tillDateChange: function () {
            this.checkAndSetPeriod();
        },
    },
});

