import mongo from "mongodb";
import connect from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

(async () => {
  let db = await connect();
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
})();

export default {
  async registerUser(userData) {
    let db = await connect();

    let doc = {
      email: userData.email,
      password: await bcrypt.hash(userData.password, 8),
      tipKorisnika: userData.tipKorisnika,
      ime: userData.ime,
      prezime: userData.prezime,
      zanimanje: userData.zanimanje,
      brtel: userData.brtel,
      zupanija: userData.zupanija,
      username: userData.username,
      datumreg: userData.datumreg
    };
    try {
      let result = await db.collection("users").insertOne(doc);
      if (result && result.insertedId) {
        return result.insertedId;
      }
    } catch (e) {
      if (e.name == "MongoError" && e.code == 11000) {
        throw new Error("Korisnik već postoji");
      }
    }
  },
  async authenticateUser(email, password) {
    let db = await connect();
    let user = await db.collection("users").findOne({ email: email });
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      delete user.password;
      let token = jwt.sign(user, process.env.JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "1 week",
      });
      return {
        token,
        email: user.email,
        tipKorisnika: user.tipKorisnika,
        ime: user.ime,
        username: user.username,
        brtel: user.brtel,
        zanimanje: user.zanimanje,
        zupanija: user.zupanija,
        prezime: user.prezime,
        datumreg: user.datumreg,
        id: user._id
      };
    } else {
      throw new Error("Cannot authenticate");
    }
  },
  async changeUserPassword(email, old_password, new_password) {
    let db = await connect()
    let user = await db.collection("users").findOne({ email: email })
    if (user && user.password && (await bcrypt.compare(old_password, user.password))) {
      let new_password_hashed = await bcrypt.hash(new_password, 8)
      let result = await db.collection("users").updateOne(
        { _id: user._id },
        {
          $set: {
            password: new_password_hashed
          }
        }
      )
      return result.modifiedCount == 1
    }
  },
  verify(req, res, next) {
    try {
      let authorization = req.headers.authorization.split(" ");
      let type = authorization[0];
      let token = authorization[1];

      if (type !== "Bearer") {
        res.status(401).send();
      } else {
        req.jwt = jwt.verify(token, process.env.JWT_SECRET);
        return next();
      }
    } catch (e) {
      return res.status(401).send();
    }
  },
};
