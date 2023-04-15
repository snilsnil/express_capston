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

exports.resPc = (req, res) => {
    res.render("pc",{layout:'pc'})
};
exports.resPcLOZBOTW = (req, res) => {
    res.render("pc_LOZBOTW",{layout:'pc_LOZBOTW'})
};
exports.resPcLOZSS = (req, res) => {
    res.render("pc_LOZSS",{layout:'pc_LOZSS'})
};
exports.resPcSupermario = (req, res) => {
    res.render("pc_supermario",{layout:'pc_supermario'})
};


exports.resPs = (req, res) => {
    res.render("ps",{layout:'ps'})
};
exports.resPsLOZBOTW = (req, res) => {
    res.render("ps_LOZBOTW",{layout:'ps_LOZBOTW'})
};
exports.resPsLOZSS = (req, res) => {
    res.render("ps_LOZSS",{layout:'ps_LOZSS'})
};
exports.resPsSupermario = (req, res) => {
    res.render("ps_supermario",{layout:'ps_supermario'})
};


exports.resXbox = (req, res) => {
    res.render("xbox",{layout:'xbox'})
};
exports.resXboxLOZBOTW = (req, res) => {
    res.render("xbox_LOZBOTW",{layout:'xbox_LOZBOTW'})
};
exports.resXboxLOZSS = (req, res) => {
    res.render("xbox_LOZSS",{layout:'xbox_LOZSS'})
};
exports.resXboxSupermario = (req, res) => {
    res.render("xbox_supermario",{layout:'xbox_supermario'})
};


exports.resNintendo = (req, res) => {
    res.render("nintendo",{layout:'nintendo'})
};
exports.resNintendoLOZBOTW = (req, res) => {
    res.render("nintendo_LOZBOTW",{layout:'nintendo_LOZBOTW'})
};
exports.resNintendoLOZSS = (req, res) => {
    res.render("nintendo_LOZSS",{layout:'nintendo_LOZSS'})
};
exports.resNintendoSupermario = (req, res) => {
    res.render("nintendo_supermario",{layout:'nintendo_supermario'})
};