// to run: electron-packager . --platform=win32 --arch=x64 --icon="./logoesw.ico" --overwrite ESW_tcpip_test

const { app, BrowserWindow } = require('electron')



app.allowRendererProcessReuse = false
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    const win = new BrowserWindow({
        width: 3840, //1920,
        height: 1080,
        minWidth: 3840, //1920,
        webPreferences: {
            allowRunningInsecureContent: true, 
            nodeIntegration: true,
            webSecurity: false,
            enableRemoteModule: true
        },
        simpleFullscreen: true,
		fullscreen: true,
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
    //BrowserWindow.setMinimumSize(3840, 1080);
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

