import axios from "axios";
const API = import.meta.env.VITE_API_URL;


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