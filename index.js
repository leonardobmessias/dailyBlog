// Importaçoes de recursos
const express = require("express");
const app = express();
const bodyParser = require("body-parser");0
const connection = require("./database/database");
const categoriesControle = require("./categories/categories.controle");
const articlesControle = require("./articles/articles.controles");

//Definição de template engine
app.set('view engine', 'ejs');

//Utilização do bodyparser(coletar dados via corpo formulario)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Autenticação conexão com banco de dados
connection.authenticate().then(()=>{
    console.log('Conexão feita com sucesso')
}).catch((error)=>{
    console.log(error) 
})

//Utilização recursos estaticos
app.use(express.static('public'))

// Chamada de rotas
app.use("/",categoriesControle);
app.use("/",articlesControle);
app.get("/",(req,res)=>{
    res.render("index");
});

// Abertura servidor
app.listen(8080,()=>{
    console.log("servidor funcionado.")
})