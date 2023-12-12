const express = require('express');
const router = express.Router();
const customerController = require("../controllers/customerController");
const itemController = require("../controllers/itemController")
const salesController = require("../controllers/salesController")
const statsController = require("../controllers/orderedSalesController")

router.get( '/customers', customerController.getCustomers);
router.get( '/customers/:id', customerController.getCustomerDetails);
router.put( '/customers/:id', customerController.postUpdateCustomer);
router.delete('/customers/:id', customerController.postDeleteCustomer);
router.post('/customers', customerController.postAddCustomer);

router.get( '/items', itemController.getItems);
router.get( '/items/:id', itemController.getItemDetails);
router.post('/items', itemController.postAddItem);

router.get( '/stats', statsController.getOrderedSales);
router.get( '/stats/:id', statsController.getOrderedSales);
router.get( '/sales', salesController.getSales);

exports.routes = router;