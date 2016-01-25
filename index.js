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
  const objects = [{
    id: 1
  }, {
    id: 2
  }, {
    id: 3
  }]

  state.objects = objects

  let current = 0

  win.webContents.on('did-finish-load', function() {
    setInterval(() => {
      current = (current + 1) % objects.length
      state.copiedReference = Object.assign({}, objects[current])
      state.brokenReference = objects[current]
      console.log('setting state', state)
      win.webContents.send('update', state)
    }, 1000)
  });

})