const getInvoices = async (req, res) => {
  try {
    const invoices = [
      {
        id: "1e395064-6b0b-4895-b788-8591d5fcd765",
        invNo: "30064",
        dueDate: "2017-01-29",
        dpd: 3426,
        outstanding: "115000.00",
        customerCode: "CSW10353",
        customerName: "KIMIA BIOSCIENCES LTD.",
        lane: "Collecting",
      },
      {
        id: "d3190bd1-ca3b-4dcc-80bf-72962ebc5ea5",
        invNo: "30089",
        dueDate: "2017-06-26",
        dpd: 3278,
        outstanding: "161000.00",
        customerCode: "CSW10557",
        customerName: "MRS Bearings Pvt Ltd.",
        lane: "Collecting",
      },
      {
        id: "715249f2-f3aa-450a-92c7-e0c4c6ef9230",
        invNo: "30161",
        dueDate: "2017-07-30",
        dpd: 3244,
        outstanding: "230000.00",
        customerCode: "CSW10436",
        customerName: "Shanti Patra Plastics Pvt. Ltd",
        lane: "Collecting",
      }
    ];

    res.json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getInvoiceById = async (req, res) => {
  try {
    const invoices = [
      {
        id: "1e395064-6b0b-4895-b788-8591d5fcd765",
        invNo: "30064",
        dueDate: "2017-01-29",
        dpd: 3426,
        outstanding: "115000.00",
        customerCode: "CSW10353",
        customerName: "KIMIA BIOSCIENCES LTD.",
        lane: "Collecting",
      },
      {
        id: "d3190bd1-ca3b-4dcc-80bf-72962ebc5ea5",
        invNo: "30089",
        dueDate: "2017-06-26",
        dpd: 3278,
        outstanding: "161000.00",
        customerCode: "CSW10557",
        customerName: "MRS Bearings Pvt Ltd.",
        lane: "Collecting",
      },
    ];

    const invoice = invoices.find(
      (item) => item.id === req.params.id
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      data: invoice,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInvoices,
  getInvoiceById
};