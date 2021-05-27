const Excel = require('exceljs');
const electron = require('electron');
const {dialog, BrowserWindow} = require('electron').remote;

 export async function exportToExcel(reportData){
     reportData = reportData.array;
    //console.log (`Toooooooooooooooooooo ${reportData}`)
    //BrowserWindow.getFocusedWindow(),
    let fl = dialog.showSaveDialogSync( BrowserWindow.getFocusedWindow(), {
        filters: [{ name: 'Excel file', extensions: ['xlsx'] }]
    })
    if(fl == undefined) {
        console.log('file path', fl);
        return;    
    }
    
    console.log('file path', fl);
    

    await exportToExc(reportData, fl);
   // window.close();
}


async function exportToExc(reportData, fileName){
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Report');
    for(let i = 0; i < reportData.length; i++){
        let rowNumber = i + 1;
        let cell = worksheet.getCell(`A${rowNumber}`); 
        cell.value = rowNumber;
        cell = worksheet.getCell(`B${rowNumber}`); 
        cell.value = reportData[i];
    }
    // Keep in mind that reading and writing is promise based.
    await workbook.xlsx.writeFile(fileName);

}