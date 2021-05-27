const { app, BrowserWindow } = require('electron')



app.allowRendererProcessReuse = false
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    const win = new BrowserWindow({
        // width: 3860,
        width: 1366,
        // minWidth: 3860,
        minWidth: 1366,
        // maxWidth: 3840,
        // height: 1080,
        height: 768,
        // minHeight: 1080,
        minHeight: 768,
        webPreferences: {
            allowRunningInsecureContent: true, 
            nodeIntegration: true,
            webSecurity: false,
            enableRemoteModule: true
        },
    })

    win.loadFile('index.html')
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
