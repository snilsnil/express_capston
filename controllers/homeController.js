exports.resLayout = (req, res) => {
    //res.render(출력이름,{layout:'실제 출력할 ejs'})
    res.render("layout",{layout:'layout'});
};
exports.resLogin = (req, res) => {
    res.render("login",{layout:'login'})
};
exports.resSignup = (req, res) => {
    res.render("login",{layout:'signup'})
};
exports.resFindIdPassword = (req, res) => {
    res.render("findidpassword",{layout:'findidpassword'})
};