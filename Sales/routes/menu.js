const express = require('express');
const customerController = require("../controllers/customerController");
const itemController = require("../controllers/itemController")
const salesController = require("../controllers/salesController")
const homeController = require("../controllers/homeController")
const router = express.Router();

router.get( '/customers', customerController.getCustomers);
router.get( '/showCustomers', customerController.getCustomers);
router.get( '/editInfo/:id', customerController.editCustomer);
router.post( '/postUpdateCustomer', customerController.postUpdateCustomer);
router.get( '/add-customer', customerController.getAddCustomer );
router.post( '/customer', customerController.postAddCustomer);

router.get( '/items', itemController.getItems);
router.get( '/showItems', itemController.getItems);
router.get( '/add-item', itemController.getAddItem );
router.post( '/item', itemController.postAddItem);

router.get( '/sales', salesController.getSales);
router.get( '/showSales', salesController.getSales);

router.get( '/home', homeController.getStats);
router.get( '/showStats', homeController.getStats);

exports.routes = router;