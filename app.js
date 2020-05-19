var express = require("express");
var app = express();
var request = require("request")
var bodyParser = require("body-parser")
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.render("register")
})

app.get("/registration",(req,res)=>{
    res.render("register")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/home",(req,res)=>{
    res.render("home")
})


app.post("/register",(req,res)=>{
    request.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvEYQ1_KbcjF6UGGKsIjn9-QmE7jY4wjc",{json : {
        email:req.body.regs.email,
        password:req.body.regs.password,
        returnSecureToken: true
    }},(error,  response,body)=>{
        if(error){
            console.log(error)
        }else{
           res.redirect('/login')
        }
    })  
})


app.post("/login",(req,res)=>{
    request.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvEYQ1_KbcjF6UGGKsIjn9-QmE7jY4wjc",{json : {
        email:req.body.log.email,
        password:req.body.log.password,
        returnSecureToken: true
    }},(error,response,body)=>{
        if(error){
            console.log(error)
        }else{
            console.log(body)
            res.redirect("/home")
        }
    })  
})


app.listen(200,()=>{
    console.log("server Started")
})