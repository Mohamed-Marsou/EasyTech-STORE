const Users = require("../modules/User");
const addCartCountToLocals = async (req, res, next) => {
  if (req.session.UserId) {
    try {
      const user = await Users.findById(req.session.UserId).select("Cart");
      const cartCount = user.Cart.length;
      res.locals.cartCount = cartCount;
    } catch (err) {
      console.log(err);
    }
  } else {
    res.locals.cartCount = 0;
  }
  next();
};
module.exports = addCartCountToLocals;
