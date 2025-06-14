import { DataTable } from "./DataTable";

interface Invoice {
  invoice: string;
  paymentStatus: "Paid" | "Pending" | "Unpaid";
  totalAmount: string;
  paymentMethod: "Credit Card" | "PayPal" | "Bank Transfer";
  paymentDate: string;
}

const invoices: Invoice[] = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" , paymentDate: "2024-01-01" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal", paymentDate: "2022-01-01"},
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer",paymentDate: "2025-01-01" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card",paymentDate: "2021-01-01" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal",paymentDate: "2020-01-01" },
  { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" ,paymentDate: "2020-01-01"},
  { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card",paymentDate: "2019-01-01" },
];
export interface Column<T> {
  title: string;
  field: keyof T;
  width?: number | string;
  align?: "left" | "right" | "center";
}

const columns : Column<Invoice>[] = [
  { title: "Invoice", field: "invoice" },
  { title: "Status", field: "paymentStatus" },
  { title: "Method", field: "paymentMethod" },
    { title: "Date", field: "paymentDate", align: "center" },
  { title: "Amount", field: "totalAmount", align: "right" },

];

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
        <DataTable
          data={invoices}
          columns={columns}
          caption="A list of your recent invoices."
        />
      </div>
    </div>
  );
}

export default App;
