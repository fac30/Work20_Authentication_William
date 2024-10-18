const {removeSession, getSession} = require('../model/session');
const Layout = require("../templates")

function get(req, res){
  const sid = req.signedCookies.sid;
  const session = getSession(sid);
  const title = "Confess your secrets";
  const content = `
  <div class="Cover">
    <h1>${title}</h1>
    ${
      session
        ? `<form method="POST" action="/log-out"><button class="Button">Log out</button></form>`
        : `<nav><a href="/sign-up">Sign up</a> or <a href="/log in</a></nav>`
    }
  </div>
  `;
  const body = Layout({title, content});
  res.send(body)
}

function post(req, res) {
  /**
   * [1] Get the session ID from the cookie
   * [2] Remove that session from the DB
   * [3] Remove the session cookie
   * [4] Redirect back home
   */
  const sid = req.signedCookies.sid;
  removeSession(sid);

  res.clearCookie("sid")
  res.redirect("/");
}

module.exports = { get, post };
