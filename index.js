import express from "express";
import { render } from "ejs";
import bodyParser from "body-parser";


const app = express()
const port = 3000;


app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}))

let posts = []
// const index = req.params.index;
// const post = posts[index]

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.get("/profile", (req, res)=>{
    res.render("profile.ejs", {posts})
})

app.get("/create", (req, res)=>{
    res.render("create.ejs")
})

app.post("/submit", (req, res)=>{
    const {title, content} = req.body
    posts.push({title, content})
    res.redirect("/profile")
})

app.get("/edit/:index", (req, res)=>{
    const index = req.params.index
    const post = posts[index]
    if(!post) return res.redirect("/profile")
    res.render("edit.ejs", {post, index})
})

app.post("/edit/:index", (req, res)=>{
    const index = req.params.index
    const {title, content} = req.body
    if(index >= 0 && index < posts.length){
        posts[index] = {title, content}
    }
    
    res.redirect("/profile")
})

app.get("/delete/:index", (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
    }
    res.redirect("/profile");
})  

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})