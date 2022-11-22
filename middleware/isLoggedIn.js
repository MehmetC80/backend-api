const prisma = require('../prisma/index');

const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.cookieToken;

    if (!token) {
      return res.status(400).json({ msg: 'bitte log dich ein' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    next();
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = isLoggedIn;
