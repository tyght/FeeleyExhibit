// userPassport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "ไม่พบผู้ใช้" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "รหัสผ่านไม่ถูกต้อง" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
