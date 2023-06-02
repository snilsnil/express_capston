// controllers/usersController.js
"use strict";

/**
 * Listing 18.9 (p. 268-269)
 * Listing 18.11 (p. 271)
 * userController.js에서 인덱스 액션 생성과 index 액션의 재방문
 */
const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  getUserParams = (body) => {
    return {
      id: body.id,
      email: body.email,
      password: body.password,
    }
  }; // 사용자 모델 요청

module.exports = {
  index: (req, res, next) => {
    User.find() // index 액션에서만 퀴리 실행
      .then((users) => {
        // 사용자 배열로 index 페이지 렌더링
        res.locals.users = users; // 응답상에서 사용자 데이터를 저장하고 다음 미들웨어 함수 호출
        next();
      })
      .catch((error) => {
        // 로그 메시지를 출력하고 홈페이지로 리디렉션
        console.log(`Error fetching users: ${error.message}`);
        next(error); // 에러를 캐치하고 다음 미들웨어로 전달
      });
  },
  indexView: (req, res) => {
    res.render("users/index", {
      page: "users",
      title: "All Users",
    }); // 분리된 액션으로 뷰 렌더링
  },

  /**
   * 노트: 구독자 컨트롤러에서 index 액션이 getAllSubscribers를 대체한다. main.js에서 액션 관련
   * 라우트 index를 가리키도록 수정하고 subscribers.ejs를 index.ejs로 변경된 점을 기억하자. 이
   * 뷰는 views 폴더 아래 subscribers 폴더에 있어야 한다.
   */

  /**
   * Listing 19.2 (p. 278)
   * userController.js에 액션 생성 추가
   */
  // 폼의 렌더링을 위한 새로운 액션 추가

  // 사용자를 데이터베이스에 저장하기 위한 create 액션 추가
  findid: (req, res, next) => {
    let email = req.body.email;
    let userParams = getUserParams(req.body);
    // 폼 파라미터로 사용자 조회
    if (req.session.isLoggedIn == true) {
      return res.send(`
      <script>
          alert("이미 로그인이 되었습니다.");
          window.location.href="/";
      </script>`);
    } else {
      if (email == "") {
        return res.send(`
          <script>
              alert("이메일을 입력하세요");
              window.location.href="/findidpassword";
          </script>`);
      } else {
        User.findOne({ email: email })
          .then((user) => {
            if (user) {
              console.log(user.email);
              console.log(user.id);
              res.locals.user = user;
              next();
            } else {
              return res.send(`
                <script>
                    alert("회원이 존재하지 않습니다.");
                    window.location.href="/findidpassword";
                </script>`);
            }
            // 사용자가 존재하지 않더라도 next() 호출
          })
          .catch((error) => {
            console.log(`Error finding user: ${error.message}`);
            next(error);
          });
      }
    }
  },
  findidView: (req, res) => {
    res.render("_pages/findid", {
      page: "findidv",
      title: "Findid",
    });
  },


  findpwd: (req, res, next) => {
    let email = req.body.email;
    let id = req.body.id;
    // 폼 파라미터로 사용자 조회

    if (req.session.isLoggedIn == true) {
      return res.send(`
        <script>
            alert("이미 로그인이 되었습니다.");
            window.location.href="/";
        </script>`);
    } else {
      if (email == "" || id == "") {
        return res.send(`
          <script>
              alert("ID와 이메일을 입력하세요.");
              window.location.href="/findidpassword";
          </script>`);
      } else {
        User.findOne({ email: email, id: id })
          .then((user) => {
            if (user) {
              console.log(user.email);
              console.log(user.id);
              res.locals.user = user;
              res.render("_pages/findpwd", {
                page: "findpwd",
                title: "Findpwd",
              });
            } else {
              return res.send(`
                <script>
                    alert("회원이 존재하지 않습니다.");
                    window.location.href="/findidpassword";
                </script>`);
            }
          })
          .catch((error) => {
            console.log(`Error finding user: ${error.message}`);
            next(error);
          });
      }
    }
  },

  findpwdView: (req, res, next) => {
    next(); // 뷰 렌더링을 위해 next() 호출하지 않음
  },

  // 여기 오류
  updatepwd: (req, res, next) => {
    let userParams = getUserParams(req.body);

    console.log(userParams);

    if (req.session.isLoggedIn == true) {
      return res.send(`
        <script>
            alert("이미 로그인이 되었습니다.");
            window.location.href="/";
        </script>`);
    } else {
      // 중복된 id 값이 존재하는지 확인
      User.findOne({ id: userParams.id })
        .then((existingUser) => {
          if (!existingUser) {
            // 해당 id를 가진 사용자가 존재하지 않는 경우
            console.log(`No user found with ID: ${userParams.id}`);
            // 적절한 오류 처리를 수행하거나 클라이언트에게 알림을 보낼 수 있습니다.
          } else {
            // 존재하는 id 값을 가진 사용자인 경우 비밀번호를 해싱하여 업데이트
            bcrypt.hash(userParams.password, 10)
              .then(hash => {
                userParams.password = hash;

                User.updateOne({ id: userParams.id }, { $set: userParams })
                  .then((result) => {
                    if (result.nModified === 0) {
                      // 업데이트된 문서가 없는 경우
                      console.log(`No user found with ID: ${userParams.id}`);
                      // 적절한 오류 처리를 수행하거나 클라이언트에게 알림을 보낼 수 있습니다.
                    } else {
                      // 업데이트 성공한 경우
                      res.locals.user = userParams;
                      res.render("_pages/sspwd", {
                        page: "sspwd",
                        title: "sspwd",
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(`Error updating user by ID: ${error.message}`);
                    next(error);
                  });
              })
              .catch((error) => {
                console.log(`Error in hashing password: ${error.message}`);
                next(error);
              });
          }
        })
        .catch((error) => {
          console.log(`Error finding user by ID: ${error.message}`);
          next(error);
        });
    }
  },


  create: (req, res, next) => {
    let userParams = getUserParams(req.body);
    // 폼 파라미터로 사용자 생성
    User.create(userParams)
      .then((user) => {
        res.locals.user = user;
        res.render("_pages/success_signup", {
          page: "success",
          title: "Success",
        });
      })
      .catch((error) => {
        if (error.keyValue.id == userParams.id) {
          return res.send(`
            <script>
                alert("이미 존재하는 ID 입니다.");
                window.location.href="/signup";
            </script>`);
        } else {
          console.log(`Error saving user: ${error.message}`);
          next(error);
        }
      });
  },

  // 분리된 redirectView 액션에서 뷰 렌더링

  login: (req, res, next) => {
    const id = req.body.id;
    const password = req.body.password;
    if (req.session.isLoggedIn == true) {
      return res.send(`
      <script>
          alert("이미 로그인이 되었습니다.");
          window.location.href="/";
      </script>`);
    } else if (id == "") {
      return res.send('<script>alert("똑바로 입력하세요."); window.location.href="/login";</script>');
    } else {
      // 아이디로 사용자를 찾습니다.
      User.findOne({ id: id })
        .then(user => {
          if (!user) {
            return res.send('<script>alert("존재하지 않는 ID입니다.."); window.location.href="/login";</script>');
          } else {
            if (!bcrypt.compare(user.password, password)) {
              return res.send('<script>alert("비밀번호가 일치하지 않습니다."); window.location.href="/login";</script>');
            } else {
              req.session.isLoggedIn = true;
              req.session.user = user;
              req.session.save(err => {
                if (err) {
                  console.log(err);
                }
                return res.redirect('/');
              });
            }
          }
        })
        .catch(err => console.log(err));
    }
  },

  logout: (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    });
  },

  relogin: (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
      }
      res.redirect('/login');
    });
  },

  UpdateUsers: (req, res, next) => {
    const devicePixelRatio = parseInt(req.query.pixelWidth) || 0;
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn) {
      let username = req.session.user.id;
      let userpassword = req.session.user.password;
      let userParams = getUserParams(req.body);
      if (userParams.password == userpassword) {
        return res.send(`
      <script>
          alert("지금 사용중인 비밀번호입니다.");
          window.location.href="/updateusers";
      </script>`);
      } else {
        bcrypt.hash(userParams.password, 10)
          .then(hash => {
            userParams.password = hash;
            User.updateOne({
              $set: userParams
            })
              .then((user) => {
                return res.render("_pages/success_updateuser", {
                  isLoggedIn,
                  username,
                  pixelWidth: devicePixelRatio,
                  page: "success_updateuser",
                  title: "Success_updateuser",
                });
              })
              .catch((error) => {
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
              });
          })
          .catch(error => {
            console.log(`Error in hashing password: ${error.message}`);
            next(error);
          });

      };
    } else {
      return res.send(`
      <script>
          alert("로그인을 하십시오");
          window.location.href="/login";
      </script>`);
    }
  },
};
