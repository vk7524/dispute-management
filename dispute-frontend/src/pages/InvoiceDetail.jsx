import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CreateDispute from "./CreateDispute";

import { getInvoiceById } from "../services/invoiceService";

function InvoiceDetail() {
  const { id } = useParams();

  const [invoiceData, setInvoiceData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [showDisputeModal, setShowDisputeModal] =
    useState(false);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const response =
        await getInvoiceById(id);

      setInvoiceData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!invoiceData) {
    return <h3>Invoice Not Found</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Invoice Detail - {invoiceData.invNo}
      </h2>

      <hr />

      <p>
        <b>Customer Code:</b>{" "}
        {invoiceData.customerCode}
      </p>

      <p>
        <b>Customer Name:</b>{" "}
        {invoiceData.customerName}
      </p>

      <p>
        <b>Invoice Number:</b>{" "}
        {invoiceData.invNo}
      </p>

      <p>
        <b>Outstanding:</b> ₹
        {invoiceData.outstanding}
      </p>

      <p>
        <b>Due Date:</b>{" "}
        {invoiceData.dueDate}
      </p>

      <p>
        <b>Lane:</b>{" "}
        {invoiceData.lane}
      </p>

      <button
        onClick={() =>
          setShowDisputeModal(true)
        }
      >
        Raise Dispute
      </button>

      {showDisputeModal && (
        <CreateDispute
          invoiceData={{
            customerCode:
              invoiceData.customerCode,

            invoice:
              invoiceData.invNo,
          }}
          onClose={() =>
            setShowDisputeModal(false)
          }
        />
      )}
    </div>
  );
}

export default InvoiceDetail;