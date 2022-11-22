// bring prisma and cookie
const prisma = require('../prisma/index');
const cookieToken = require('../helpers/cookieToken');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//user signup

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check

    // check name,email,password is set
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Email, Passwort oder Name müssen vollständig sein' });
    }

    // name is to short or empty
    if (name === '' || name.length <= 2) {
      return res.status(400).json({ error: 'Name ist zu kurz' });
    }

    // email is not vailde
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email ist nicht valide' });
    }

    //generating salt
    const salt = await bcrypt.genSalt(10);

    // hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    // send user a token
    cookieToken(user, res);

    // return res.status(201).json({ user, msg: 'user in die DB eingefügt' });
  } catch (err) {
    return res
      .status(400)
      .json({
        error: err,
        msg: 'server fehler user kann nicht erstellt werden',
      });
  }
};
