// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, Menu } from 'electron';

import contextMenu from 'electron-context-menu';

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

contextMenu({
  labels: {
    copy: 'Kopieren',
    paste: 'Einfügen',
    cut: 'Ausschneiden',
  },
  showLookUpSelection: false,
  showSearchWithGoogle: false,
  showInspectElement: process.env.NODE_ENV !== 'production',
});

// Global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

const createMainWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
    width: 1024,
    height: 728,
  });

  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac
      ? [
          {
            label: 'Haustechnik Esterbauer Rechnungen',
            submenu: [
              {
                label: 'Über Haustechnik Esterbauer Rechnungen',
                selector: 'orderFrontStandardAboutPanel:',
              },
              { label: 'Ausblenden', selector: 'hide' },
              { label: 'Andere ausblenden', selector: 'hideothers' },
              { label: 'Alle anzeigen', selector: 'unhide' },
              { type: 'separator' },
              {
                label: 'Beenden',
                accelerator: 'Command+Q',
                click() {
                  app.quit();
                },
              },
            ],
          },
        ]
      : []),
    {
      label: 'Bearbeiten',
      submenu: [
        { label: 'Rückgängig', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        {
          label: 'Wiederholen',
          accelerator: 'Shift+CmdOrCtrl+Z',
          selector: 'redo:',
        },
        { type: 'separator' },
        { label: 'Ausschneiden', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Kopieren', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Einfügen', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        {
          label: 'Alles auswählen',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:',
        },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { label: 'Verkleinern', selector: 'minimize' },
        { label: 'Vergrößern', selector: 'zoom' },
        ...(isMac
          ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }]
          : [{ label: 'Schließen', accelerator: 'Cmd+W', selector: 'close' }]),
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.maximize();
  mainWindow.setKiosk(false);
  mainWindow.setMenu(null);
  mainWindow.setClosable(true);
  mainWindow.setMinimizable(true);
  mainWindow.setMaximizable(true);
  mainWindow.setResizable(true);

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });

  mainWindow.loadURL(`file://${app.getAppPath()}/web/index.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });
};

// Quit application when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it is common to re-create a window even after all windows have been closed
  if (!mainWindow) {
    createMainWindow();
  }
});

// Create main BrowserWindow when electron is ready
app.on('ready', () => {
  createMainWindow();
});

app.on('before-quit', () => {});
