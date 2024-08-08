import { useParams } from "next/navigation";
import { forwardRef, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";


const ComponentToPrint = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { id, customer, invoice, bankInfo } = props as Props;
  
    function formatDateString(arg0: any): import("react").ReactNode {
        throw new Error("Function not implemented.");
    }

    return (
      <div className='w-full px-2 py-8' ref={ref}>
        <div className='lg:w-2/3 w-full mx-auto shadow-md border-[1px] rounded min-h-[75vh] p-5'>
          <header className='w-full flex items-center space-x-4 justify-between'>
            <div className='w-4/5'>
              <h2 className='text-lg font-semibold mb-3'>INVOICE #0{id}</h2>
              <section className='mb-6'>
                <p className='opacity-60'>Issuer Name: {bankInfo?.account_name}</p>
                <p className='opacity-60'>Date: {formatDateString(invoice?.created_at!)}</p>
              </section>
              <h2 className='text-lg font-semibold mb-2'>TO:</h2>
              <section className='mb-6'>
                <p className='opacity-60'>Name: {invoice?.customer_id}</p>
                <p className='opacity-60'>Address: {customer?.address}</p>
                <p className='opacity-60'>Email: {customer?.email}</p>
              </section>
            </div>
  
            <div className='w-1/5 flex flex-col'>
              <p className='font-extrabold text-2xl'>
                {`${bankInfo?.currency}${Number(invoice?.total_amount).toLocaleString()}`}
              </p>
              <p className='text-sm opacity-60'>Total Amount</p>
            </div>
          </header>
          <div>
            <p className='opacity-60'>Subject:</p>
            <h2 className='text-lg font-semibold'>{invoice?.title}</h2>
          </div>
  
          <InvoiceTable itemList={invoice?.items ? JSON.parse(invoice.items) : []} />
        </div>
      </div>
    );
  });
  
  ComponentToPrint.displayName = "ComponentToPrint";

  export default function Invoices() {
    const { id } = useParams<{ id: string }>();
    // Reference to the component to be printed
    const componentRef = useRef<any>();
  
    // States for the data
    const [customer, setCustomer] = useState<Customer>();
    const [bankInfo, setBankInfo] = useState<BankInfo>();
    const [invoice, setInvoice] = useState<Invoice>();
  
    // Function that sends invoice via email
    const handleSendInvoice = async () => {};
  
    // Function that prints the invoice
    const handlePrint = useReactToPrint({
      documentTitle: "Invoice",
      content: () => componentRef.current,
    });
  
    return (
      <main className='w-full min-h-screen'>
        <section className='w-full flex p-4 items-center justify-center space-x-5 mb-3'>
          <button
            className='p-3 text-blue-50 bg-blue-500 rounded-md'
            onClick={handlePrint}
          >
            Download
          </button>
          <button
            className='p-3 text-blue-50 bg-green-500 rounded-md'
            onClick={() => {
              handleSendInvoice();
            }}
          >
            Send Invoice
          </button>
        </section>
  
        <ComponentToPrint
          ref={componentRef}
          id={id}
          customer={customer}
          bankInfo={bankInfo}
          invoice={invoice}
        />
      </main>
    );
  }