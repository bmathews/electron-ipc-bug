'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

app.on('ready', () => {
  const win = new BrowserWindow({
    title: 'ipc-bug',
    width: 860,
    height: 470
  })

  win.loadURL('file://' + __dirname + '/index.html')

  const state = {}
  const object = { 'prop': 1 }

  state.firstReference = object
  state.brokenReference = object

  let current = 0

  win.webContents.on('did-finish-load', function() {
    console.log('sending state', state)
    win.webContents.send('update', state)
  });

})