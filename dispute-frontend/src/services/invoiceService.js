import axios from "axios";

const API = "http://localhost:5000/api";

export const getInvoices = async () => {
  const response = await axios.get(
    `${API}/invoices?queue=work`
  );

  return response.data;
};

export const getInvoiceById = async (id) => {
  const response = await axios.get(
    `${API}/invoices/${id}`
  );

  return response.data;
};