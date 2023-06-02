// app.js
"use strict";

/**
 * =====================================================================
 * Define Express app and set it up
 * =====================================================================
 */

// modules
const express = require("express"), // express를 요청
  layouts = require("express-ejs-layouts"), // express-ejs-layout의 요청
  app = express(); // express 애플리케이션의 인스턴스화

// controllers 폴더의 파일을 요청
const pagesController = require("./controllers/pagesController"),
  usersController = require("./controllers/usersController"),
  errorController = require("./controllers/errorController"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressSession = require("express-session"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

/**
 * =====================================================================
 * Define Mongoose and MongoDB connection
 * =====================================================================
 */

// 애플리케이션에 Mongoose 설정
const mongoose = require("mongoose"), // mongoose를 요청
  dbName = "Hitgame";

// 데이터베이스 연결 설정
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
  useNewUrlParser: true,
});

// 연결되면 메시지를 보냄
const db = mongoose.connection;
db.once("open", () => {
  console.log(`Connected to ${dbName} MongoDB using Mongoose!`);
});

/**
 * =====================================================================
 * Define app settings and middleware
 * =====================================================================
 */

app.set("port", process.env.PORT || 3000);

// ejs 레이아웃 렌더링
app.set("view engine", "ejs"); // ejs를 사용하기 위한 애플리케이션 세팅
app.use(layouts); // layout 모듈 사용을 위한 애플리케이션 세팅
app.use(express.static("public"));

// body-parser의 추가
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 900000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());

// 로컬 전략(LocalStrategy)을 정의하여 사용자 이름/비밀번호 인증을 처리합니다.
passport.use(new LocalStrategy(
  function (username, password, done) {
    // 여기에서 인증 로직을 구현합니다.
    // 제공된 사용자 이름과 비밀번호를 확인하고, 적절한 결과로 done()을 호출합니다.
  }
));

// 세션 관리를 위해 사용자 객체를 직렬화(serialize)하고 역직렬화(deserialize)합니다.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // 제공된 id를 사용하여 데이터베이스에서 사용자 객체를 가져옵니다.
  // 사용자 객체를 done()으로 전달합니다.
});

/**
 * =====================================================================
 * Define routes
 * =====================================================================
 */

const router = express.Router(); // Express 라우터를 인스턴스화
app.use("/", router); // 라우터를 애플리케이션에 추가

/**
 * Pages
 */


router.get("/", pagesController.showHome); // 홈 메인 화면

router.get("/login", pagesController.showLogin); // 로그인 화면
router.post("/loginProcess", usersController.login); //로그인 기능 라우터
router.get("/logout", usersController.logout); //로그아웃 라우터

router.get("/updateuser", pagesController.showUser); //회원 정보 홈페이지
router.get("/updateusers", pagesController.showUsers);  //회원 정보 수정 홈페이지
router.post("/success_updateuser", usersController.UpdateUsers); //회원정보 수정 완료 홈페이지
router.get("/relogin", usersController.relogin); // 회원정보 수정 후 로그아웃위한 화면


router.get("/findidpassword", pagesController.showFindpassword); // ID 또는 비밀번호 찾기 홈페이지
router.post("/findid", usersController.findid, usersController.findidView); // ID 찾은 홈페이지
router.post("/findpwd", usersController.findpwd, usersController.findpwdView); // 비밀번호 수정을 위한 홈페이지
router.post("/sspwd", usersController.updatepwd); // 비밀번호 수정 기능 라우터

router.get("/signup", pagesController.showSignup); //회원가입 홈페이지
router.post("/success_signup", usersController.create); // 회원가입 기능 라우터

/**
 * =====================================================================
 * Errors Handling & App Startup
 * =====================================================================
 */
app.use(errorController.resNotFound); // 미들웨어 함수로 에러 처리 추가
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  // 3000번 포트로 리스닝 설정
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
