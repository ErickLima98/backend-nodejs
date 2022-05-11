const User = require("../models/login");
const crypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Validation of register data
const joi = require("@hapi/joi");
const validateNewUser = joi.object({
  name: joi.string().min(3).max(50).required(),
  email: joi.string().min(10).max(50).required().email(), //don't verify if it's an verified email, but verify if it's an email structure
  password: joi.string().min(6).max(15).required(),
  isStudent: joi.boolean(),
  isTutor: joi.boolean(),
  token: joi.string().min(10)
});

//Validation of login data
const schemaLogin = joi.object({
  email: joi.string().min(10).max(50).required().email(), //don't verify if it's an verified email, but verify if it's an email structure
  password: joi.string().min(6).max(15).required(),
});

module.exports = {
  //Register new user
  register: async (req, res) => {
    //validation of user data
    //because of the validators above, we catch de error, if error exist, show on postman
    // the errors (invalid name, email, password)
    const { error } = validateNewUser.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    //Search into DB, to find an email, if exist, show error
    const verifyEmail = await User.findOne({ email: req.body.email });
    if (verifyEmail) {
      return res
        .status(400)
        .json({ error: true, mensaje: "El correo ya fue registrado" });
    }

    //Encrypt password
    const saltos = await crypt.genSalt(10);
    const password = await crypt.hash(req.body.password, saltos);

    //Add new user to DB
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
      isStudent: req.body.isStudent,
      isTutor: req.body.isTutor
    });
    
    try {
      const userDB = await user.save();
      res.json({
        error: null,
        data: userDB,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  //Validating User for login
  login: async (req, res) => {
    //Validation of user credentials
    const { error } = schemaLogin.validate(req.body);
    if (error) {
      return res.status(400).json({ error: true, mensaje: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: true, mensaje: "El Usuario no ha sido registrado" });
    }

    const validatePass = await crypt.compare(req.body.password, user.password);
    if (!validatePass) {
      return res.status(400).json({ error: true, mensaje: "Password Incorrecta" });
    }

    //creating token
     const token = jwt.sign({
       name: user.name,
       id: user._id
     },"" + process.env.TOKEN );
     
    res.header('auth-token', token).json({
      error: null,
      name: user.name,
      email: user.email,
      id: user._id,
      mensaje: "Bienvenido a Te Ayudo",
      token: token
    });
  },
  validatedUserToken: async (req, res) => {
    res.json({
      error: null,
      data: {
          title: "Protected Rute",
          user: req.user
      }
  })

  },
  getUser: async (req, res) => {
    const {userId} = req.params;
    const use = await User.findById(userId);
    res.status(200).json(use);
},
};
