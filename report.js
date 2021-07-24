// const datepicker = require('vuejs-datepicker');
// import datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.js';
const moment = require('moment');
const ipcAdmin = require('electron').ipcRenderer;
const { connectDB, getShift, getShifts, getShiftBatchers } = require('../BatcherWatcher/DB/db')
const numeral = require('numeral');
const { ipcRenderer } = require('electron');

ipcRenderer.on('reportValue', (event, arg) => {
    report.reportValue = arg;
    if (arg == 'fractions') {
        report.count = 1;
        report.report.height = "272mm"; 
    }
});

function numberWithSpaces(number) {
    let numberString = numeral(number).format('1 000.12');
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



let testData = {
    "beginDate": "2021-06-07 09:44:16", "endDate": "2021-06-07 16:00:12", "skips": 95, "weight": "947.58", "reserved": 1,
    "datas": [
        { "time": "2021-06-07 09:46:12", "batcher": "L Skip", "number": 1, "gross": 10450, "tare": 290, "net": 10160, "shiftId": "2021-06-07T03:44:16.000Z", "index": 1 },
        { "time": "2021-06-07 09:48:19", "batcher": "R Skip", "number": 2, "gross": 10860, "tare": 420, "net": 10440, "shiftId": "2021-06-07T03:44:16.000Z", "index": 2 },
        { "time": "2021-06-07 09:50:32", "batcher": "L Skip", "number": 3, "gross": 10610, "tare": 290, "net": 10320, "shiftId": "2021-06-07T03:44:16.000Z", "index": 3 },
        { "time": "2021-06-07 09:52:32", "batcher": "R Skip", "number": 4, "gross": 10130, "tare": 400, "net": 9730, "shiftId": "2021-06-07T03:44:16.000Z", "index": 4 },
        { "time": "2021-06-07 09:54:38", "batcher": "L Skip", "number": 5, "gross": 10380, "tare": 290, "net": 10090, "shiftId": "2021-06-07T03:44:16.000Z", "index": 5 },
        { "time": "2021-06-07 09:56:41", "batcher": "R Skip", "number": 6, "gross": 11090, "tare": 410, "net": 10680, "shiftId": "2021-06-07T03:44:16.000Z", "index": 6 },
        { "time": "2021-06-07 09:58:49", "batcher": "L Skip", "number": 7, "gross": 10030, "tare": 320, "net": 9710, "shiftId": "2021-06-07T03:44:16.000Z", "index": 7 },
        { "time": "2021-06-07 10:00:55", "batcher": "R Skip", "number": 8, "gross": 10390, "tare": 410, "net": 9980, "shiftId": "2021-06-07T03:44:16.000Z", "index": 8 },
        { "time": "2021-06-07 10:11:24", "batcher": "L Skip", "number": 9, "gross": 10570, "tare": 330, "net": 10240, "shiftId": "2021-06-07T03:44:16.000Z", "index": 9 },
        { "time": "2021-06-07 10:13:22", "batcher": "R Skip", "number": 10, "gross": 10700, "tare": 420, "net": 10280, "shiftId": "2021-06-07T03:44:16.000Z", "index": 10 },
        { "time": "2021-06-07 10:15:32", "batcher": "L Skip", "number": 11, "gross": 10440, "tare": 310, "net": 10130, "shiftId": "2021-06-07T03:44:16.000Z", "index": 11 },
        { "time": "2021-06-07 10:17:31", "batcher": "R Skip", "number": 12, "gross": 9950, "tare": 420, "net": 9530, "shiftId": "2021-06-07T03:44:16.000Z", "index": 12 },
        { "time": "2021-06-07 10:19:37", "batcher": "L Skip", "number": 13, "gross": 10000, "tare": 320, "net": 9680, "shiftId": "2021-06-07T03:44:16.000Z", "index": 13 },
        { "time": "2021-06-07 10:22:12", "batcher": "R Skip", "number": 14, "gross": 10670, "tare": 420, "net": 10250, "shiftId": "2021-06-07T03:44:16.000Z", "index": 14 },
        { "time": "2021-06-07 10:24:18", "batcher": "L Skip", "number": 15, "gross": 9960, "tare": 300, "net": 9660, "shiftId": "2021-06-07T03:44:16.000Z", "index": 15 },
        { "time": "2021-06-07 10:26:31", "batcher": "R Skip", "number": 16, "gross": 10080, "tare": 420, "net": 9660, "shiftId": "2021-06-07T03:44:16.000Z", "index": 16 },
        { "time": "2021-06-07 10:40:44", "batcher": "L Skip", "number": 17, "gross": 10780, "tare": 500, "net": 10280, "shiftId": "2021-06-07T03:44:16.000Z", "index": 17 },
        { "time": "2021-06-07 10:42:52", "batcher": "R Skip", "number": 18, "gross": 9980, "tare": 420, "net": 9560, "shiftId": "2021-06-07T03:44:16.000Z", "index": 18 },
        { "time": "2021-06-07 10:44:57", "batcher": "L Skip", "number": 19, "gross": 10240, "tare": 270, "net": 9970, "shiftId": "2021-06-07T03:44:16.000Z", "index": 19 },
        { "time": "2021-06-07 10:46:59", "batcher": "R Skip", "number": 20, "gross": 10450, "tare": 570, "net": 9880, "shiftId": "2021-06-07T03:44:16.000Z", "index": 20 },
        { "time": "2021-06-07 10:49:03", "batcher": "L Skip", "number": 21, "gross": 10180, "tare": 320, "net": 9860, "shiftId": "2021-06-07T03:44:16.000Z", "index": 21 },
        { "time": "2021-06-07 10:51:33", "batcher": "R Skip", "number": 22, "gross": 9950, "tare": 430, "net": 9520, "shiftId": "2021-06-07T03:44:16.000Z", "index": 22 },
        { "time": "2021-06-07 10:53:39", "batcher": "L Skip", "number": 23, "gross": 9980, "tare": 280, "net": 9700, "shiftId": "2021-06-07T03:44:16.000Z", "index": 23 }, { "time": "2021-06-07 10:55:54", "batcher": "R Skip", "number": 24, "gross": 10720, "tare": 550, "net": 10170, "shiftId": "2021-06-07T03:44:16.000Z", "index": 24 }, { "time": "2021-06-07 10:58:06", "batcher": "L Skip", "number": 25, "gross": 10240, "tare": 310, "net": 9930, "shiftId": "2021-06-07T03:44:16.000Z", "index": 25 }, { "time": "2021-06-07 11:00:42", "batcher": "R Skip", "number": 26, "gross": 10420, "tare": 660, "net": 9760, "shiftId": "2021-06-07T03:44:16.000Z", "index": 26 }, { "time": "2021-06-07 11:02:46", "batcher": "L Skip", "number": 27, "gross": 10010, "tare": 330, "net": 9680, "shiftId": "2021-06-07T03:44:16.000Z", "index": 27 }, { "time": "2021-06-07 11:04:46", "batcher": "R Skip", "number": 28, "gross": 10000, "tare": 450, "net": 9550, "shiftId": "2021-06-07T03:44:16.000Z", "index": 28 }, { "time": "2021-06-07 11:06:49", "batcher": "L Skip", "number": 29, "gross": 10850, "tare": 330, "net": 10520, "shiftId": "2021-06-07T03:44:16.000Z", "index": 29 }, { "time": "2021-06-07 11:08:50", "batcher": "R Skip", "number": 30, "gross": 10070, "tare": 450, "net": 9620, "shiftId": "2021-06-07T03:44:16.000Z", "index": 30 }, { "time": "2021-06-07 11:10:56", "batcher": "L Skip", "number": 31, "gross": 10380, "tare": 350, "net": 10030, "shiftId": "2021-06-07T03:44:16.000Z", "index": 31 }, { "time": "2021-06-07 11:12:56", "batcher": "R Skip", "number": 32, "gross": 10370, "tare": 420, "net": 9950, "shiftId": "2021-06-07T03:44:16.000Z", "index": 32 }, { "time": "2021-06-07 11:42:16", "batcher": "L Skip", "number": 33, "gross": 10560, "tare": 350, "net": 10210, "shiftId": "2021-06-07T03:44:16.000Z", "index": 33 }, { "time": "2021-06-07 11:44:23", "batcher": "R Skip", "number": 34, "gross": 10250, "tare": 450, "net": 9800, "shiftId": "2021-06-07T03:44:16.000Z", "index": 34 }, { "time": "2021-06-07 11:46:34", "batcher": "L Skip", "number": 35, "gross": 10520, "tare": 370, "net": 10150, "shiftId": "2021-06-07T03:44:16.000Z", "index": 35 }, { "time": "2021-06-07 11:48:33", "batcher": "R Skip", "number": 36, "gross": 10500, "tare": 430, "net": 10070, "shiftId": "2021-06-07T03:44:16.000Z", "index": 36 }, { "time": "2021-06-07 11:50:42", "batcher": "L Skip", "number": 37, "gross": 10320, "tare": 350, "net": 9970, "shiftId": "2021-06-07T03:44:16.000Z", "index": 37 }, { "time": "2021-06-07 11:52:53", "batcher": "R Skip", "number": 38, "gross": 10630, "tare": 610, "net": 10020, "shiftId": "2021-06-07T03:44:16.000Z", "index": 38 }, { "time": "2021-06-07 11:54:56", "batcher": "L Skip", "number": 39, "gross": 10340, "tare": 330, "net": 10010, "shiftId": "2021-06-07T03:44:16.000Z", "index": 39 }, { "time": "2021-06-07 11:56:56", "batcher": "R Skip", "number": 40, "gross": 10100, "tare": 420, "net": 9680, "shiftId": "2021-06-07T03:44:16.000Z", "index": 40 }, { "time": "2021-06-07 11:58:59", "batcher": "L Skip", "number": 41, "gross": 10150, "tare": 420, "net": 9730, "shiftId": "2021-06-07T03:44:16.000Z", "index": 41 }, { "time": "2021-06-07 12:00:56", "batcher": "R Skip", "number": 42, "gross": 9990, "tare": 420, "net": 9570, "shiftId": "2021-06-07T03:44:16.000Z", "index": 42 }, { "time": "2021-06-07 12:30:03", "batcher": "L Skip", "number": 43, "gross": 10700, "tare": 330, "net": 10370, "shiftId": "2021-06-07T03:44:16.000Z", "index": 43 }, { "time": "2021-06-07 12:32:41", "batcher": "R Skip", "number": 44, "gross": 10680, "tare": 430, "net": 10250, "shiftId": "2021-06-07T03:44:16.000Z", "index": 44 }, { "time": "2021-06-07 12:34:46", "batcher": "L Skip", "number": 45, "gross": 10540, "tare": 320, "net": 10220, "shiftId": "2021-06-07T03:44:16.000Z", "index": 45 }, { "time": "2021-06-07 12:36:51", "batcher": "R Skip", "number": 46, "gross": 10440, "tare": 440, "net": 10000, "shiftId": "2021-06-07T03:44:16.000Z", "index": 46 }, { "time": "2021-06-07 12:39:08", "batcher": "L Skip", "number": 47, "gross": 10540, "tare": 810, "net": 9730, "shiftId": "2021-06-07T03:44:16.000Z", "index": 47 }, { "time": "2021-06-07 12:41:10", "batcher": "R Skip", "number": 48, "gross": 10360, "tare": 430, "net": 9930, "shiftId": "2021-06-07T03:44:16.000Z", "index": 48 }, { "time": "2021-06-07 12:43:22", "batcher": "L Skip", "number": 49, "gross": 10600, "tare": 340, "net": 10260, "shiftId": "2021-06-07T03:44:16.000Z", "index": 49 }, { "time": "2021-06-07 12:45:42", "batcher": "R Skip", "number": 50, "gross": 10320, "tare": 450, "net": 9870, "shiftId": "2021-06-07T03:44:16.000Z", "index": 50 }, { "time": "2021-06-07 12:48:32", "batcher": "L Skip", "number": 51, "gross": 10280, "tare": 350, "net": 9930, "shiftId": "2021-06-07T03:44:16.000Z", "index": 51 }, { "time": "2021-06-07 12:50:37", "batcher": "R Skip", "number": 52, "gross": 10410, "tare": 450, "net": 9960, "shiftId": "2021-06-07T03:44:16.000Z", "index": 52 }, { "time": "2021-06-07 12:53:17", "batcher": "L Skip", "number": 53, "gross": 10270, "tare": 340, "net": 9930, "shiftId": "2021-06-07T03:44:16.000Z", "index": 53 }, { "time": "2021-06-07 13:08:26", "batcher": "R Skip", "number": 54, "gross": 10130, "tare": 450, "net": 9680, "shiftId": "2021-06-07T03:44:16.000Z", "index": 54 }, { "time": "2021-06-07 13:10:37", "batcher": "L Skip", "number": 55, "gross": 10290, "tare": 310, "net": 9980, "shiftId": "2021-06-07T03:44:16.000Z", "index": 55 }, { "time": "2021-06-07 13:12:39", "batcher": "R Skip", "number": 56, "gross": 10460, "tare": 460, "net": 10000, "shiftId": "2021-06-07T03:44:16.000Z", "index": 56 }, { "time": "2021-06-07 13:14:45", "batcher": "L Skip", "number": 57, "gross": 10400, "tare": 330, "net": 10070, "shiftId": "2021-06-07T03:44:16.000Z", "index": 57 }, { "time": "2021-06-07 13:16:44", "batcher": "R Skip", "number": 58, "gross": 10170, "tare": 430, "net": 9740, "shiftId": "2021-06-07T03:44:16.000Z", "index": 58 }, { "time": "2021-06-07 13:18:48", "batcher": "L Skip", "number": 59, "gross": 10580, "tare": 320, "net": 10260, "shiftId": "2021-06-07T03:44:16.000Z", "index": 59 }, { "time": "2021-06-07 13:20:50", "batcher": "R Skip", "number": 60, "gross": 10280, "tare": 430, "net": 9850, "shiftId": "2021-06-07T03:44:16.000Z", "index": 60 }, { "time": "2021-06-07 13:22:56", "batcher": "L Skip", "number": 61, "gross": 10450, "tare": 310, "net": 10140, "shiftId": "2021-06-07T03:44:16.000Z", "index": 61 }, { "time": "2021-06-07 13:24:58", "batcher": "R Skip", "number": 62, "gross": 10610, "tare": 430, "net": 10180, "shiftId": "2021-06-07T03:44:16.000Z", "index": 62 }, { "time": "2021-06-07 13:27:03", "batcher": "L Skip", "number": 63, "gross": 10230, "tare": 320, "net": 9910, "shiftId": "2021-06-07T03:44:16.000Z", "index": 63 }, { "time": "2021-06-07 13:37:45", "batcher": "R Skip", "number": 64, "gross": 10540, "tare": 520, "net": 10020, "shiftId": "2021-06-07T03:44:16.000Z", "index": 64 }, { "time": "2021-06-07 13:39:48", "batcher": "L Skip", "number": 65, "gross": 10750, "tare": 330, "net": 10420, "shiftId": "2021-06-07T03:44:16.000Z", "index": 65 }, { "time": "2021-06-07 13:41:50", "batcher": "R Skip", "number": 66, "gross": 10220, "tare": 620, "net": 9600, "shiftId": "2021-06-07T03:44:16.000Z", "index": 66 }, { "time": "2021-06-07 13:43:58", "batcher": "L Skip", "number": 67, "gross": 10960, "tare": 370, "net": 10590, "shiftId": "2021-06-07T03:44:16.000Z", "index": 67 }, { "time": "2021-06-07 13:46:02", "batcher": "R Skip", "number": 68, "gross": 10240, "tare": 430, "net": 9810, "shiftId": "2021-06-07T03:44:16.000Z", "index": 68 }, { "time": "2021-06-07 13:48:07", "batcher": "L Skip", "number": 69, "gross": 10450, "tare": 320, "net": 10130, "shiftId": "2021-06-07T03:44:16.000Z", "index": 69 }, { "time": "2021-06-07 13:50:17", "batcher": "R Skip", "number": 70, "gross": 10510, "tare": 460, "net": 10050, "shiftId": "2021-06-07T03:44:16.000Z", "index": 70 }, { "time": "2021-06-07 13:52:30", "batcher": "L Skip", "number": 71, "gross": 10530, "tare": 370, "net": 10160, "shiftId": "2021-06-07T03:44:16.000Z", "index": 71 }, { "time": "2021-06-07 13:54:37", "batcher": "R Skip", "number": 72, "gross": 10170, "tare": 450, "net": 9720, "shiftId": "2021-06-07T03:44:16.000Z", "index": 72 }, { "time": "2021-06-07 13:56:45", "batcher": "L Skip", "number": 73, "gross": 10460, "tare": 350, "net": 10110, "shiftId": "2021-06-07T03:44:16.000Z", "index": 73 }, { "time": "2021-06-07 13:58:58", "batcher": "R Skip", "number": 74, "gross": 10440, "tare": 460, "net": 9980, "shiftId": "2021-06-07T03:44:16.000Z", "index": 74 }, { "time": "2021-06-07 14:01:05", "batcher": "L Skip", "number": 75, "gross": 10470, "tare": 340, "net": 10130, "shiftId": "2021-06-07T03:44:16.000Z", "index": 75 }, { "time": "2021-06-07 14:03:10", "batcher": "R Skip", "number": 76, "gross": 10230, "tare": 440, "net": 9790, "shiftId": "2021-06-07T03:44:16.000Z", "index": 76 }, { "time": "2021-06-07 14:05:16", "batcher": "L Skip", "number": 77, "gross": 10710, "tare": 590, "net": 10120, "shiftId": "2021-06-07T03:44:16.000Z", "index": 77 }, { "time": "2021-06-07 14:29:04", "batcher": "R Skip", "number": 78, "gross": 9880, "tare": 450, "net": 9430, "shiftId": "2021-06-07T03:44:16.000Z", "index": 78 }, { "time": "2021-06-07 14:31:09", "batcher": "L Skip", "number": 79, "gross": 10370, "tare": 380, "net": 9990, "shiftId": "2021-06-07T03:44:16.000Z", "index": 79 }, { "time": "2021-06-07 14:33:12", "batcher": "R Skip", "number": 80, "gross": 10090, "tare": 560, "net": 9530, "shiftId": "2021-06-07T03:44:16.000Z", "index": 80 }, { "time": "2021-06-07 14:35:22", "batcher": "L Skip", "number": 81, "gross": 10080, "tare": 390, "net": 9690, "shiftId": "2021-06-07T03:44:16.000Z", "index": 81 }, { "time": "2021-06-07 14:37:42", "batcher": "R Skip", "number": 82, "gross": 10120, "tare": 650, "net": 9470, "shiftId": "2021-06-07T03:44:16.000Z", "index": 82 }, { "time": "2021-06-07 14:39:52", "batcher": "L Skip", "number": 83, "gross": 10650, "tare": 340, "net": 10310, "shiftId": "2021-06-07T03:44:16.000Z", "index": 83 }, { "time": "2021-06-07 15:01:10", "batcher": "R Skip", "number": 84, "gross": 10800, "tare": 470, "net": 10330, "shiftId": "2021-06-07T03:44:16.000Z", "index": 84 }, { "time": "2021-06-07 15:03:24", "batcher": "L Skip", "number": 85, "gross": 10730, "tare": 320, "net": 10410, "shiftId": "2021-06-07T03:44:16.000Z", "index": 85 }, { "time": "2021-06-07 15:05:26", "batcher": "R Skip", "number": 86, "gross": 10070, "tare": 460, "net": 9610, "shiftId": "2021-06-07T03:44:16.000Z", "index": 86 }, { "time": "2021-06-07 15:07:26", "batcher": "L Skip", "number": 87, "gross": 10440, "tare": 370, "net": 10070, "shiftId": "2021-06-07T03:44:16.000Z", "index": 87 }, { "time": "2021-06-07 15:09:32", "batcher": "R Skip", "number": 88, "gross": 10230, "tare": 460, "net": 9770, "shiftId": "2021-06-07T03:44:16.000Z", "index": 88 }, { "time": "2021-06-07 15:11:46", "batcher": "L Skip", "number": 89, "gross": 10630, "tare": 320, "net": 10310, "shiftId": "2021-06-07T03:44:16.000Z", "index": 89 }, { "time": "2021-06-07 15:13:49", "batcher": "R Skip", "number": 90, "gross": 10450, "tare": 510, "net": 9940, "shiftId": "2021-06-07T03:44:16.000Z", "index": 90 }, { "time": "2021-06-07 15:15:53", "batcher": "L Skip", "number": 91, "gross": 10300, "tare": 340, "net": 9960, "shiftId": "2021-06-07T03:44:16.000Z", "index": 91 }, { "time": "2021-06-07 15:17:50", "batcher": "R Skip", "number": 92, "gross": 10400, "tare": 460, "net": 9940, "shiftId": "2021-06-07T03:44:16.000Z", "index": 92 }, { "time": "2021-06-07 15:19:57", "batcher": "L Skip", "number": 93, "gross": 10250, "tare": 350, "net": 9900, "shiftId": "2021-06-07T03:44:16.000Z", "index": 93 }, { "time": "2021-06-07 15:22:02", "batcher": "R Skip", "number": 94, "gross": 10550, "tare": 440, "net": 10110, "shiftId": "2021-06-07T03:44:16.000Z", "index": 94 }, { "time": "2021-06-07 15:24:08", "batcher": "L Skip", "number": 95, "gross": 10550, "tare": 360, "net": 10190, "shiftId": "2021-06-07T03:44:16.000Z", "index": 95 }]
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
        // objectShift: getEmptyShift(),
        objectShift: testData,
        startDate: new moment().format('YYYY-MM-DD'),    //"2021-06-16"
        endDate: new moment().format('YYYY-MM-DD'),
        shifts: ['no shifts found'],    // all shifts from period
        selectShifts: 'no shifts found',
        datePrintingReport: { year: new Date().getFullYear(), day: new Date().getDate(), month: new Date().getMonth() + 1 },
        count: 3,
        report: {
            height: '822mm',
        },
        reportValue: ''
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
            this.count = this.objectShift.datas.length;
            if (this.count == 35 || this.count == 82 || this.count == 129 || this.count == 176 || this.count == 223 || this.count == 270 || this.count == 317)
                this.count = ''
            else {
                this.count = Math.trunc((this.count - 35) / 47) + 2;
                this.report.height = this.count * 272 + 'mm'
            }
            console.log(`@@@@@@@@@@@@@@@@@@@@@@@@ count=${this.count}; report height=${this.report.height}`)
            window.print();
        },
        fromDateChange: function (e) {    // startDate = "2021-06-16"; type string
            this.checkAndSetPeriod();
            console.log(`event = ${e}; startDate = ${JSON.stringify(this.startDate)}; endDate = ${this.endDate}}`)
        },
        tillDateChange: function () {
            this.checkAndSetPeriod();
        },
    },
});

