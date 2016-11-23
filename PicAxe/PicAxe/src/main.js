const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const countdown = require('./countdown');
const ipc = electron.ipcMain;

const windows = [];

app.on('ready', _ => {
    [1, 2, 3].forEach(_ => {
        let win = new BrowserWindow({
            height: 400,
            width: 400
        });

        win.loadURL(url.format({
            pathname: path.join(__dirname, 'countdown.html'),
            protocol: 'file',
            slashes: true
        }));

        win.on('closed', _ => {
            console.log('closed');
            mainWindow = null;
        });

        windows.push(win);
    });
});

ipc.on('countdown-start', _=> {
    countdown(count => {
        windows.forEach(win => {
            win.webContents.send('countdown', count);
        });
    });
});