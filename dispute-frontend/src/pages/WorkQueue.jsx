import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../services/invoiceService";

function WorkQueue() {

  const [invoices, setInvoices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    loadInvoices();

  }, []);

  const loadInvoices = async () => {

    try {

      const response =
        await getInvoices();

      setInvoices(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Work Queue</h2>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>Customer</th>
            <th>Invoice</th>
            <th>Due Date</th>
            <th>DPD</th>
            <th>Outstanding</th>
            <th>Lane</th>
          </tr>
        </thead>

        <tbody>

          {invoices.map((invoice) => (

            <tr key={invoice.id}>

              <td>
                {invoice.customerName}
              </td>

              <td>

                <button
                  onClick={() =>
                    navigate(
                      `/invoice/${invoice.id}`
                    )
                  }
                >
                  {invoice.invNo}
                </button>

              </td>

              <td>{invoice.dueDate}</td>

              <td>{invoice.dpd}</td>

              <td>
                ₹{invoice.outstanding}
              </td>

              <td>{invoice.lane}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default WorkQueue;