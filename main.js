// #1 정의
const port=3000,
express=require('express'),
layouts=require('express-ejs-layouts'),
homeController=require('./controllers/homeController'),
errorController=require('./controllers/errorController'),//추가
app=express();

// #2 set
app.set("view engine", "ejs");

// #3 use
app.use(layouts);
app.use(express.static('public'));//추가



// #4 get/post
app.get("/", homeController.resLayout);
app.get("/login", homeController.resLogin);
app.get("/signup", homeController.resSignup);
app.get("/findidpassword", homeController.resFindIdPassword);

app.get("/pc", homeController.resPc);
app.get("/pc/LOZBOTW", homeController.resPcLOZBOTW);
app.get("/pc/LOZSS", homeController.resPcLOZSS);
app.get("/pc/supermario", homeController.resPcSupermario);

app.get("/ps", homeController.resPs);
app.get("/ps/LOZBOTW", homeController.resPsLOZBOTW);
app.get("/ps/LOZSS", homeController.resPsLOZSS);
app.get("/ps/supermario", homeController.resPsSupermario);

app.get("/xbox", homeController.resXbox);
app.get("/xbox/LOZBOTW", homeController.resXboxLOZBOTW);
app.get("/xbox/LOZSS", homeController.resXboxLOZSS);
app.get("/xbox/supermario", homeController.resXboxSupermario);

app.get("/nintendo", homeController.resNintendo);
app.get("/nintendo/LOZBOTW", homeController.resNintendoLOZBOTW);
app.get("/nintendo/LOZSS", homeController.resNintendoLOZSS);
app.get("/nintendo/supermario", homeController.resNintendoSupermario);


// 추가 에러처리
app.use(errorController.logErrors);
app.use(errorController.resNotFound);
app.use(errorController.resInternalError);

// #5 listen
app.listen(port,()=>{
    console.log(port);
});
