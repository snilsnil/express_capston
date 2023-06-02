// homeController.js
"use strict";

/**
 * Listing 12.5 (p. 178)
 * 홈 컨트롤러로의 라우팅
 */
const User = require('../models/User');

module.exports = {


  showHome: (req, res, next) => {
    const devicePixelRatio = parseInt(req.query.pixelWidth) || 0;
    const isLoggedIn = req.session.isLoggedIn;
    let username = '';

    if (isLoggedIn) {
      username = req.session.user.id;
      User.findOne({ id: req.session.user.id })
        .then(user => {
          res.render("index", {
            isLoggedIn,
            username,
            pixelWidth: devicePixelRatio,
            page: "home",
            title: "Home",
          });
        })
        .catch(err => console.log(err));
    } else {
      username = null;
      res.render("index", {
        isLoggedIn,
        username,
        pixelWidth: devicePixelRatio,
        page: "home",
        title: "Home",
      });
    }
  },

  showUser: (req, res, next) => {
    const devicePixelRatio = parseInt(req.query.pixelWidth) || 0;
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn) {
      let username = req.session.user.id;
      let userpassword = req.session.user.password;
      let useremail = req.session.user.email;
      res.render("_pages/updateuser", {
        isLoggedIn,
        username,
        useremail,
        userpassword,
        pixelWidth: devicePixelRatio,
        page: "updateuser",
        title: "UpdateUser",
      });
    } else {
      return res.send(`
      <script>
          alert("로그인을 하십시오");
          window.location.href="/login";
      </script>`);
    }
  },

  showUsers: (req, res, next) => {
    const devicePixelRatio = parseInt(req.query.pixelWidth) || 0;
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn) {
      let username = req.session.user.id;
      let userpassword = req.session.user.password;
      let useremail = req.session.user.email;
      res.render("_pages/updateusers", {
        isLoggedIn,
        username,
        useremail,
        userpassword,
        pixelWidth: devicePixelRatio,
        page: "updateusers",
        title: "UpdateUsers",
      });
    } else {
      return res.send(`
      <script>
          alert("로그인을 하십시오");
          window.location.href="/login";
      </script>`);
    }
  },


  showLogin: (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn == false || isLoggedIn == undefined) {
      res.render("_pages/login", {
        page: "login",
        title: "Login",
      });
    } else {
      return res.send(`
      <script>
          alert("이미 로그인이 되었습니다.");
          window.location.href="/";
      </script>`);
    }
  },
  showSignup: (req, res) => {
    res.render("_pages/signup", {
      page: "signup",
      title: "Signup",
    });
  },
  showFindpassword: (req, res) => {
    if (req.session.isLoggedIn == true) {
      return res.send(`
      <script>
          alert("이미 로그인이 되었습니다.");
          window.location.href="/";
      </script>`);
    } else {
      res.render("_pages/findidpassword", {
        page: "findidpassword",
        title: "Findidpassword",
      })
    };
  },
};
