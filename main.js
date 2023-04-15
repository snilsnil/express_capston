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

// 추가 에러처리
app.use(errorController.logErrors);
app.use(errorController.resNotFound);
app.use(errorController.resInternalError);

// #5 listen
app.listen(port,()=>{
    console.log(port);
});
