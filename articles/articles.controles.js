//Importação de recursos
const express = require("express");
const router = express.Router(); 
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");



//Definição de rotas
router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        include:[{model:Category}]
    }).then((articles)=>{
        res.render("admin/articles/index",{articles,articles})
    })
});

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/articles/new",{categories:categories})
    })
    
})


router.post("/article/save",(req,res)=>{
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category

    Article.create({
        title:title,
        slug:slugify(title),
        body:body,
        categoryId:category
    }).then(()=>{
        res.redirect("/admin/articles")
    })
});
   
module.exports = router;