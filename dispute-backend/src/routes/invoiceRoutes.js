const express = require("express");

const {
  getInvoices,
  getInvoiceById,
} = require("../controllers/invoiceController");

const router = express.Router();

router.get("/", getInvoices);

router.get("/:id", getInvoiceById);

module.exports = router;