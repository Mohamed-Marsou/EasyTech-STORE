const express = require("express");
const clientController = require("../controllers/client/clientController");
const router = express.Router();

router.get("/", clientController.getHome);
router.get("/home", clientController.getHome);
router.get("/login", clientController.getLogin);
router.get("/Cart", clientController.getCart);
router.get("/Cart_details", clientController.getCartDetails);
router.get("/wishList", clientController.getWishList);
router.get("/FaQ", clientController.getFaQ);
router.get("/contact", clientController.getContact);
router.get("/profile", clientController.getProfile);
router.get("/profile/address", clientController.getProfileAddress);
router.get("/LogOut", clientController.getUserLogOut);
router.get("/:ProdId", clientController.getProduct);
router.get("/EasyTech/desktop", clientController.getDesktop);
router.get("/EasyTech/laptops", clientController.getLaptop);
router.get("/EasyTech/components", clientController.getComm);
router.get("/EasyTech/Software", clientController.getDegital);
router.get("/advance/filter", clientController.getAdvcFilter);

router.get("/AddCart/:ref", clientController.getProdCart);
router.get("/AddWishList/:ref", clientController.addToWishList);
router.get("/rmvPrd/:ref", clientController.getRemoveFromWishList);
router.get("/rmvOrder/:ref", clientController.getRemoveFromOrder);

router.post("/Product/filter", clientController.postFilter);
router.post("/createUser", clientController.postSingup);
router.post("/login", clientController.posLogin);
router.post("/UserUpdateAdress", clientController.UserUpdateAdress);
router.post("/UserUpdate", clientController.UserUpdate);
router.post("/Sub-email", clientController.SubEmail);
router.post("/EditOrderDetails", clientController.EditOrderDetails);
router.post("/order_checkout", clientController.postOrderCheckout);

module.exports = router;
