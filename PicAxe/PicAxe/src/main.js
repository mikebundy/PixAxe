const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let mainWindow;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'countdown.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.on('closed', _ => {
        console.log('closed');
        mainWindow = null;
    });
});