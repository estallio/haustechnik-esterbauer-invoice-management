// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, Menu } from 'electron';

// eslint-disable-next-line import/no-extraneous-dependencies
import electronDebug from 'electron-debug';

import contextMenu from 'electron-context-menu';

electronDebug();

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
  mainWindow.closable = true;
  mainWindow.minimizable = true;
  mainWindow.maximizable = true;
  mainWindow.resizable = true;

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });

  mainWindow.loadURL(`file://${app.getAppPath()}/web/index.html`);
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
