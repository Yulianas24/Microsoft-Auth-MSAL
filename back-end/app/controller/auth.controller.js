const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const CryptoJS = require('crypto-js')

const User = require("../model/user.model");


const msalLogin = async (req,res) => {
  try {
    var decrypted = CryptoJS.AES.decrypt(req.body.data,process.env.AES_KEY);

    decrypted = decrypted.toString(CryptoJS.enc.Utf8)
    decrypted = JSON.parse(decrypted)

    const user_data = {
      'name' : decrypted.name,
      'email' : decrypted.username,
      'tenant_id' : decrypted.tenantId,
    }
    const token = jsonwebtoken.sign(req.body, process.env.APP_KEY, {
      expiresIn: "2h",
    });

    user_data.token = token;

    res.status(200).json({
      message: "Login success!",
      data: user_data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}
const login = async (req, res) => {
  try {
    const user = await User.query()
      .select([
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.created_at",
        "users.updated_at",
      ])
      .where("email", req.body.email)
      .first();

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const user_data = await User.query()
        .select([
          "users.id",
          "users.name",
          "users.email",
          "users.password",
          "users.created_at",
          "users.updated_at",
        ])
        .where("id", user.id)
        .first();

      const token = jsonwebtoken.sign(user_data.toJSON(), process.env.APP_KEY, {
        expiresIn: "2h",
      });

      user_data.token = token;

      res.status(200).json({
        message: "Login success!",
        data: user_data
      });

    } else {
      res.status(400).json({
        message: "Invalid Credentials!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const register = async (req, res) => {
  try {
    let userCheck = await User.query().where("email", req.body.email).first();
    if (userCheck) {
      return res.status(400).json({
        status: 400,
        message: "Email not available!",
      });
    }

    const user = await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  login,
  msalLogin,
  register
};
