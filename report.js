// const datepicker = require('vuejs-datepicker');
// import datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.js';
// import Vue from 'vue/dist/vue.js';

//var Vue = require("vue/dist/vue.js");
// const electron = require('electron');
const moment = require('moment');
const { remote, ipcRenderer, electron } = require("electron");

const numeral = require('numeral');
// const { BrowserWindow } = remote

// const { connectDB, getShift, getShifts, getShiftBatchers } = require('../BatcherWatcher/DB/db')

function numberWithSpaces(number) {
    let numberString = numeral(number).format('10 000.12');
    return numberString.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

function getEmptyShift() {
    return {
        beginDate: '',
        endDate: '',
        skips: 0,
        weight: '',
        datas: []
    };
}

/*{beginDate: '06/03/2021 12:34:12 PM', endDate: '06/03/2021 12:40:12 PM',
    skips: '10', weight: '498',
    datas: [{ batcher: "L Skip", number: "3", gross: "10310", tare: "350", 
                net: 9960, time: "2021-06-02 10:44:08" },]
}*/

let report = new Vue({
    el: '#report',
    data: {
        // objectShift: getEmptyShift(),
        objectShift: {
            datas: [
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "1010", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "0310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "0310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "1031", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "100", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "1310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "1010", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "0310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "103", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },


            ]
        },
        startDate: new moment().format('YYYY-MM-DD'),    //"2021-06-16"
        endDate: new moment().format('YYYY-MM-DD'),
        shifts: ['no shifts found'],    // all shifts from period
        selectShifts: 'no shifts found',
        datePrintingReport: { year: new Date().getFullYear(), day: new Date().getDate(), month: new Date().getMonth() + 1 },
        count: 3,
        report: {
            height: '272mm',
        },
    },
    methods: {
        selectShiftChange: async function () {
            console.log('selectShiftChange: async function', this.selectShifts)
            this.setShiftParams(this.selectShifts);
        },
        checkAndSetPeriod: async function () {
            let fm = moment(this.startDate).hour(0).minute(0).second(0);
            let tm = moment(this.endDate).hour(23).minute(59).second(59);
            if (tm.isBefore(fm)) {
                tm = moment(this.startDate).hour(23).minute(59).second(59);
                this.endDate = tm.format('YYYY-MM-DD');
            }
            console.log(`checkAndSetPeriod fm=${fm.format('YYYY-MM-DD HH:mm:ss')}; tm=${tm.format('YYYY-MM-DD HH:mm:ss')}`);
            if (await connectDB(true)) {
                let shifts = await getShifts(fm.format("YYYY-MM-DD HH:mm:ss"), tm.format("YYYY-MM-DD HH:mm:ss"));
                console.log(`checkAndSetPeriod shifts = `, JSON.stringify(shifts))
                //{"beginDate":"2021-06-02T19:23:35.000Z","endDate":"2021-06-03T01:49:48.000Z","skips":4,"weight":39590,"reserved":1}
                if (shifts.length) {
                    this.shifts = shifts.map((shift) => {
                        let m = new moment(shift.beginDate).format("YYYY-MM-DD HH:mm:ss")
                        console.log('checkAndSetPeriod new moment(shift)', m)
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
        },
        setShiftParams: async function (sBeginDate, shift = null) {
            this.objectShift = getEmptyShift();
            this.objectShift.weight = numberWithSpaces(this.objectShift.weight);
            if (shift == null) {
                shift = await getShift(sBeginDate);
            }
            if (shift != null) {
                let datas = await getShiftBatchers(sBeginDate);
                datas = datas.map((d) => {
                    return { ...d, time: new moment(d.time).format("YYYY-MM-DD HH:mm:ss") };
                });
                let endDate = (shift.endDate != null) ? (new moment(shift.endDate).format("YYYY-MM-DD HH:mm:ss")) : ('');
                this.objectShift = { ...shift, beginDate: sBeginDate, endDate: endDate, datas: datas };
            }
            // счётчик количества страниц
            this.count = objectShift.datas.length;
            if (this.count == 35 || this.count == 82 || this.count == 129 || this.count == 176 || this.count == 223 || this.count == 270 || this.count == 317)
                this.count = ''
            else {
                this.count = Math.trunc((this.count - 35) / 47) + 2;
                this.report.height = this.count * 272 + 'mm'
            }
        },
        close: function () {
            window.close();
        },
        print: function () {
            window.print();
        },
        fromDateChange: function (e) {    // startDate = "2021-06-16"; type string
            this.checkAndSetPeriod();
            console.log(`event = ${e}; startDate = ${JSON.stringify(this.startDate)}; endDate = ${this.endDate}}`)
        },
        tillDateChange: function () {
            this.checkAndSetPeriod();
        }
    },
});

