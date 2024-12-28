let app, BrowserWindow, path, exec;
try {
  app = require('electron').app;
  BrowserWindow = require('electron').BrowserWindow;
  path = require('path');
  exec = require('child_process').exec;
} catch (error) {
  console.error('Error loading Electron modules:', error);
  process.exit(1);
}

let mainWindow;
let nextServerProcess;

function createMainWindow() {
  try {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
    const dev = process.env.NODE_ENV !== 'production';
    const url = 'http://localhost:3000';
    mainWindow.loadURL(url);
    if (dev) {
      mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Start Next.js server after the main window is created
      const execOptions = { cwd: __dirname };
      nextServerProcess = exec('npm run start', execOptions);
  } catch (error) {
    console.error('Error creating main window:', error);
  }
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  if (nextServerProcess) {
    nextServerProcess.kill();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});