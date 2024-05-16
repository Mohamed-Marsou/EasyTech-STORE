const Users = require("../modules/User");
const addCushCountToLocals = async (req, res, next) => {
  const userId = req.session.UserId;
  if (userId) {
    try {
      Users.findById(userId).then((user) => {
        const totalCush = user.Cart.reduce(
          (acc, item) => acc + item.price * item.Quantity,
          0
        );
        res.locals.totalCush = totalCush;
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.locals.totalCush = 0;
  }
  next();
};

module.exports = addCushCountToLocals;
