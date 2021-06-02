// to run: electron-packager . --platform=win32 --arch=x64 --icon="./logoesw.ico" --overwrite ESW_tcpip_test

const { app, BrowserWindow } = require('electron')



app.allowRendererProcessReuse = false
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    const win = new BrowserWindow({
        // width: 3860,
        width: 1920,
        // minWidth: 3860,
        // minWidth: 1850,
        // maxWidth: 3840,
        // height: 1080,
        height: 1080,
        // minHeight: 1080,
        // minHeight: 1080,
        webPreferences: {
            allowRunningInsecureContent: true, 
            nodeIntegration: true,
            webSecurity: false,
            enableRemoteModule: true
        },
    })

    win.loadFile('index.html')
      // Open the DevTools.
    // win.webContents.openDevTools();

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
