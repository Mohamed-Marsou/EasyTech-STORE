const Users = require("../../modules/User");
const Products = require("../../modules/Product");
const Mailer = require("../../modules/MailerClass");
const Subs = require("../../modules/subs");
const Orders = require("../../modules/Orders");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { updateMany } = require("../../modules/User");

exports.getHome = async (req, res, _) => {
  try {
    const highRatedProd = await Products.find({
      "rating.0": { $gte: 7 },
    }).limit(8);
    const latestItems = await Products.find().sort({ createdAt: -1 }).limit(4);
    const chpsProducts = await Products.find().sort({ sell_price: 1 }).limit(4);
    const OnsellProds = await Products.aggregate([{ $sample: { size: 4 } }]);
    res.render("index", {
      IsAuth: req.session.IsAuth,
      highSellProducts: highRatedProd,
      latestItems: latestItems,
      chpsProducts: chpsProducts,
      OnsellProds: OnsellProds,
      CartCount: res.locals.cartCount,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getLogin = (req, res, _) => {
  res.render("login", {
    EmailTaken: false,
    EmailErr: false,
    PassErr: false,
    IsAuth: req.session.IsAuth,
    CartCount: res.locals.cartCount,
  });
};
exports.getCart = async (req, res, _) => {
  const userId = req.session.UserId;
  let totalPrice = 0;

  try {
    const User = await Users.findOne({ _id: userId });
    for (let i = 0; i < User.Cart.length; i++) {
      const item = User.Cart[i];
      const itemTotal = item.price * item.Quantity;
      totalPrice += itemTotal;
    }
    res.render("Cart", {
      IsAuth: req.session.IsAuth,
      CartCount: res.locals.cartCount,
      CartProducts: User.Cart,
      User: User,
      totalPrice: totalPrice.toFixed(2),
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getCartDetails = async (req, res, _) => {
  const userId = req.session.UserId;
  try {
    const User = await Users.findOne({ _id: userId });
    res.render("Cart_details", {
      IsAuth: req.session.IsAuth,
      CartCount: res.locals.cartCount,
      CartProducts: User.Cart,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getWishList = async (req, res, _) => {
  try {
    const user = await Users.findById(req.session.UserId);
    res.render("wishList", {
      IsAuth: req.session.IsAuth,
      CartCount: res.locals.cartCount,
      wishListPrd: user.favourites,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getFaQ = (req, res, _) => {
  res.render("FaQ", {
    IsAuth: req.session.IsAuth,
    CartCount: res.locals.cartCount,
  });
};
exports.getContact = (req, res, _) => {
  res.render("contact", {
    IsAuth: req.session.IsAuth,
    CartCount: res.locals.cartCount,
  });
};
exports.getProfile = (req, res, _) => {
  Users.findById(req.session.UserId)
    .then((user) => {
      res.render("profile/Account", {
        IsAuth: req.session.IsAuth,
        user: user,
        CartCount: res.locals.cartCount,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("404");
    });
};
exports.getProfileAddress = (req, res, _) => {
  Users.findOne(req.session.UserId)
    .then((user) => {
      res.render("profile/Address", {
        IsAuth: req.session.IsAuth,
        user: user,
        CartCount: res.locals.cartCount,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getUserLogOut = (req, res, _) => {
  req.session.destroy((err) => {
    if (err) {
      res.render("404");
      console.log("Error destroying session:", err);
    } else {
      res.render("login", {
        IsAuth: false,
        EmailTaken: false,
        EmailErr: false,
        PassErr: false,
        CartCount: res.locals.cartCount,
      });
      console.log("Session destroyed.");
    }
  });
};

exports.getProduct = async (req, res, next) => {
  const ProdId = req.params.ProdId;
  try {
    const Product = await Products.findById(
      ProdId.substring(ProdId.indexOf("=") + 1)
    );
    let OverAllRating = 0;
    Product.rating.forEach((rating) => {
      OverAllRating += Number(rating[0]);
    });
    const latestItems = await Products.find().sort({ createdAt: -1 }).limit(4);
    const chpsProducts = await Products.find().sort({ sell_price: 1 }).limit(4);
    const OnsellProds = await Products.aggregate([{ $sample: { size: 4 } }]);
    res.render("product-review", {
      IsAuth: false,
      Product: Product,
      OverAllRating: OverAllRating,
      latestItems: latestItems,
      chpsProducts: chpsProducts,
      OnsellProds: OnsellProds,
      CartCount: res.locals.cartCount,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getDesktop = (req, res) => {
  Products.aggregate([
    { $match: { category: "Desktop" } },
    {
      $group: {
        _id: null,
        maxPrice: { $max: "$sell_price" },
        minPrice: { $min: "$sell_price" },
      },
    },
  ])
    .then((results) => {
      const maxPrice = results[0].maxPrice;
      const minPrice = results[0].minPrice;
      Products.find({ category: "Desktop" })
        .then((products) => {
          res.render("products-page", {
            IsAuth: req.session.IsAuth,
            products: products,
            maxPrice: maxPrice,
            minPrice: minPrice,
            CartCount: res.locals.cartCount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getLaptop = (req, res) => {
  Products.aggregate([
    { $match: { category: "laptop" } },
    {
      $group: {
        _id: null,
        maxPrice: { $max: "$sell_price" },
        minPrice: { $min: "$sell_price" },
      },
    },
  ])
    .then((results) => {
      const maxPrice = results[0].maxPrice;
      const minPrice = results[0].minPrice;
      Products.find({ category: "laptop" })
        .then((products) => {
          res.render("products-page", {
            IsAuth: req.session.IsAuth,
            products: products,
            maxPrice: maxPrice,
            minPrice: minPrice,
            CartCount: res.locals.cartCount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getComm = (req, res) => {
  Products.aggregate([
    { $match: { category: "component" } },
    {
      $group: {
        _id: null,
        maxPrice: { $max: "$sell_price" },
        minPrice: { $min: "$sell_price" },
      },
    },
  ])
    .then((results) => {
      const maxPrice = results[0].maxPrice;
      const minPrice = results[0].minPrice;
      Products.find({ category: "component" })
        .then((products) => {
          res.render("products-page", {
            IsAuth: req.session.IsAuth,
            products: products,
            maxPrice: maxPrice,
            minPrice: minPrice,
            CartCount: res.locals.cartCount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getDegital = (req, res) => {
  Products.aggregate([
    { $match: { category: "Software" } },
    {
      $group: {
        _id: null,
        maxPrice: { $max: "$sell_price" },
        minPrice: { $min: "$sell_price" },
      },
    },
  ])
    .then((results) => {
      const maxPrice = results[0].maxPrice;
      const minPrice = results[0].minPrice;
      Products.find({ category: "Software" })
        .then((products) => {
          res.render("products-page", {
            IsAuth: req.session.IsAuth,
            products: products,
            maxPrice: maxPrice,
            minPrice: minPrice,
            CartCount: res.locals.cartCount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAdvcFilter = (req, res) => {
  const ProductsQuantityControl = req.body.ProductsQuantityControl;
  const filterByCatgory = req.body.filterByCatgory;
};
// * add to Cart
exports.getProdCart = async (req, res) => {
  const userId = req.session.UserId;
  const ProdId = req.params.ref.split("=")[1];
  try {
    const product = await Products.findById(ProdId);
    const user = await Users.findById(userId);
    let cartItem = user.Cart.find((item) => item.ref === ProdId);
    if (cartItem) {
      await Users.updateOne(
        { _id: userId, "Cart.ref": ProdId },
        { $inc: { "Cart.$.Quantity": 1 } }
      );
    } else {
      await Users.updateOne(
        { _id: userId },
        {
          $push: {
            Cart: {
              ref: ProdId,
              Quantity: 1,
              Prod_name: product.Prod_name,
              price: product.sell_price,
              Prod_img: product.Prod_images[0],
            },
          },
        }
      );
    }
    res.redirect("/Cart");
  } catch (err) {
    console.log(err);
  }
};
// * add to WishList
exports.addToWishList = async (req, res) => {
  const userId = req.session.UserId;
  const ProdId = req.params.ref.split("=")[1];
  const Prd = await Products.findById(ProdId);
  console.log(Prd.Prod_name);
  await Users.updateOne(
    { _id: userId },
    {
      $addToSet: {
        favourites: {
          ref: ProdId,
          Prod_name: Prd.Prod_name,
          Prod_img: Prd.Prod_images[0],
          price: Prd.sell_price,
        },
      },
    }
  );
  res.redirect("/wishlist");
};
exports.getRemoveFromWishList = async (req, res) => {
  const userId = req.session.UserId;
  const ProdId = req.params.ref.split("=")[1];
  try {
    await Users.updateOne(
      { _id: userId },
      { $pull: { favourites: { ref: ProdId } } }
    );
    res.redirect("/wishList");
  } catch (e) {
    console.log(e);
  }
};
exports.getRemoveFromOrder = async (req, res) => {
  const userId = req.session.UserId;
  const ProdId = req.params.ref.split("=")[1];
  try {
    await Users.updateOne(
      { _id: userId },
      { $pull: { Cart: { ref: ProdId } } }
    );
    res.redirect("/Cart_details");
  } catch (e) {
    console.log(e);
  }
};
//*------------------ ------------------  POST

//! - Sing up
exports.postSingup = (req, res, _) => {
  const name = req.body.name;
  const email = req.body.email;
  let pass = req.body.pass;
  const gender = req.body.gender;

  // * Hasing the pswd
  bcrypt.hash(pass, 10, function (err, hash) {
    pass = hash;

    const regiseterUser = new Users({
      user_name: name,
      user_email: email,
      user_password: pass,
      gender: gender,
    });

    // * CHecking if email address is taken
    Users.find().then((users) => {
      let taken = false;
      users.forEach((user) => {
        if (user.user_email == email) {
          taken = true;
        }
      });
      if (taken) {
        res.render("login", {
          EmailTaken: "This Email address is taken ",
          PassErr: null,
          EmailErr: null,
          IsAuth: req.session.IsAuth,
        });
        return;
      }
      if (!taken) {
        regiseterUser
          .save()
          .then((result) => {
            res.redirect("/home");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
};

// ! LOGIN

exports.posLogin = (req, res, next) => {
  const email = req.body.Login_email;
  let pass = req.body.Login_pass;
  Users.find({ user_email: email })
    .then((user) => {
      if (user[0] != null) {
        bcrypt.compare(pass, user[0].user_password, function (err, result) {
          if (result) {
            req.session.IsAuth = true;
            req.session.UserId = user[0]._id;
            res.render("index", {
              IsAuth: req.session.IsAuth,
            });
          } else {
            res.render("login", {
              PassErr: "Incorrect password please try again",
              EmailErr: null,
              EmailTaken: null,
              IsAuth: req.session.IsAuth,
            });
          }
        });
      } else {
        res.render("login", {
          EmailErr: "Incorrect Email Address please try again",
          PassErr: null,
          EmailTaken: null,
          IsAuth: req.session.IsAuth,
        });
      }
    })
    .catch((error) => console.log(error));
};
exports.UserUpdateAdress = (req, res, next) => {
  const Address = req.body.Address;
  const City = req.body.City;
  const Zip = req.body.Zip;
  Users.updateOne(
    { _id: req.session.UserId },
    {
      $set: {
        address: Address,
        city: City,
        Zip: Zip,
      },
    }
  )
    .then((result) => {
      res.render("index", {
        IsAuth: req.session.IsAuth,
      });
    })
    .catch((error) => console.error(error));
};
exports.UserUpdate = (req, res, next) => {
  const fname = req.body.fname;
  const emailAddress = req.body.emailAddress;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  Users.updateOne(
    { _id: req.session.UserId },
    {
      $set: {
        user_name: fname,
        user_email: emailAddress,
        Phone_number: phoneNumber,
        gender: gender,
      },
    }
  )
    .then((result) => {
      res.render("index", {
        IsAuth: req.session.IsAuth,
      });
    })
    .catch((error) => console.error(error));
};

// * adding subscriber Email to DB
exports.SubEmail = (req, res, _) => {
  const Email = req.body.email;
  const subj = "New Subscription from EasyTech to mailing list ";
  const EmailBody = `
  <h1>new subscription to the mailing list</h1><br/>
  <p>new user has enter his email : </p><br/>
  <ol>
  <li>${Email}</li>
  </ol><br/>
  `;
  const msg = new Mailer();
  msg.sendEmail("marsoumtm@gmail.com", subj, "WWW.EASYTECH.COM", EmailBody);
  Subs.create({
    email: Email,
  })
    .then((result) => {
      res.render("thanks", {
        IsAuth: req.session.IsAuth,
        AddedToCart: false,
        orderConfirmed: false,
      });
    })
    .catch((err) => console.log(err));
};
//* Filter for Price ranges
exports.postFilter = (req, res) => {
  let min = req.body.filteRange;
  let max = req.body.max;
  Products.find({
    $and: [{ sell_price: { $gte: min } }, { sell_price: { $lte: max } }],
  })
    .limit(6)
    .then((products) => {
      res.render("products-page", {
        IsAuth: req.session.IsAuth,
        products: products,
        maxPrice: 0,
        minPrice: 0,
      });
    })
    .catch((err) => console.log(err));
};

exports.EditOrderDetails = async (req, res, next) => {
  const quantities = [].concat(req.body.quantity);
  const refs = [].concat(req.body.ref);
  const userId = req.session.UserId;
  try {
    for (let i = 0; i < refs.length; i++) {
      const user = await Users.findOneAndUpdate(
        { _id: userId, "Cart.ref": refs[i] },
        { $set: { "Cart.$.Quantity": Number(quantities[i]) } },
        { new: true }
      );
    }
    res.redirect("/Cart");
  } catch (err) {
    console.log(err);
    res.render("404");
  }
};
exports.postOrderCheckout = (req, res) => {
  const userId = req.session.UserId;
  const fname = req.body.userName;
  const lname = req.body.LastName;
  const email = req.body.email;
  const Address = req.body.Address;
  const City = req.body.City;
  const Zip = req.body.Zip;
  const phoneNumber = req.body.phoneNumber;
  const message = req.body.message;
  const Order = JSON.parse(req.body.Order);

  const subj = "Thank you for placing an order with us!";
  const EmailBody = `
          <h1>Thank you for your Order</h1><br/>
          <p>Dear ${fname}, </p><br/>
          <p>Thank you for placing an order on our EasyTech web store. 
          We are thrilled to have you as 
          our customer and appreciate your trust in our products and services. </p><br/>
          <p>Your order has been received and is currently being processed. 
          We will send you a confirmation email once your order is shipped.</p><br/>
          <p>f you have any questions or concerns about your order, 
          please do not hesitate to reach out to us. Our customer support team is available to assist you.</p><br/>
          <p>Thank you again for choosing EasyTech. We value your business and look forward to serving you in the future. </p><br/>
          <p>Best regards, </p><br/>
          <p style="color:red">EasyTech</p><span>Customer Support Team</span><br/>
          `;
  Order.forEach(async (o) => {
    console.log(o.ref);
    try {
      await Products.findOneAndUpdate(
        { _id: o.ref },
        { $inc: { Quantity: -o.Quantity } },
        { new: true }
      );
      await Users.updateOne({ _id: userId }, { $set: { Cart: [] } });
      const newOrder = new Orders({
        user_name: fname,
        user_email: email,
        address: Address,
        city: City,
        Phone_number: phoneNumber,
        purchases: Order,
        user_lastName: lname,
        Zip: Zip,
        Notes: message,
      });
      newOrder
        .save()
        .then((result) => {
          res.render("thanks", {
            orderConfirmed:
              "Thank you for placing an order with us! We appreciate your business and look forward to serving you.",
            AddedToCart: false,
          });

          // * SENDING Thank u Email
          const orderEmail = new Mailer();
          orderEmail.sendEmail(email, subj, "WWW.EASYTECH.COM", EmailBody);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  });
};
