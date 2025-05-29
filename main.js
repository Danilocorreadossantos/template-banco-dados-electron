const { app, BrowserWindow, ipcMain } = require('electron')
const mysql = require("mysql2/promise") // Promise 

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload : "./preload.js",
      contextIsolation: true,
    }
  })

  win.loadFile('pages/index.html')
}

async function conectarBancoDados() {
  var conexao = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "electron_db"
  })
  return conexao
}

ipcMain.handle("criar-usuario", async function (evento, campoNome, campoEmail) {
  var conexao = await conectarBancoDados()

  var criarUsuarioSQL = "INSERT INTO usuarios(nome, email) VALUES(?, ?)"

  var resultado = await conexao.execute(criarUsuarioSQL, [campoNome, campoEmail])

  console.logo("resultado", resultado)
})

app.whenReady().then(() => {
  createWindow()
})