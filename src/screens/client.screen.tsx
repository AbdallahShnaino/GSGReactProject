import "./client.screen.css";
import Header from "../components/common/header/header";
import InvoiceRow from "../components/invoice-row/invoice-row";
import Footer from "../components/common/footer/footer";
import InvoiceFilters from "../components/invoice-fillters/invoice-filters";
import CountShowSettings from "../components/count-show-settings/count-show-settings";
import personImage from "./../assets/person.png";
import { IInvoice, InvoiceStatus } from "../@types";
import { useState } from "react";

const ClientScreen = () => {
  const invoices: IInvoice[] = Array.from({ length: 200 }, (_, i) => ({
    invoiceId: i + 1,
    invoiceNumber: `INV-${1000 + i}`,
    invoiceIssueDate: new Date(2024, 0, i + 1).toISOString().split("T")[0], // YYYY-MM-DD format
    invoiceDueDate: new Date(2024, 1, i + 1).toISOString().split("T")[0],
    invoiceFromBusiness: `Business ${i + 1}`,
    invoiceToClient: `Client ${i + 1}`,
    invoiceSubTotal: Math.floor(Math.random() * 500 + 100), // Random subtotal between 100-600
    invoiceTax: Math.floor(Math.random() * 50 + 10), // Random tax between 10-60
    invoiceGrandTotal: 0, // Placeholder, will be calculated
    invoiceStatus: Object.values(InvoiceStatus)[Math.floor(Math.random() * 4)], // Random status
  })).map((invoice) => ({
    ...invoice,
    invoiceGrandTotal: invoice.invoiceSubTotal + invoice.invoiceTax, // Calculate grand total
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);

  const onPreClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const onNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const updateItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
  };

  return (
    <>
      <div className="oxygen-bold  client-nav">
        <section className="header">
          <Header />
        </section>
        <section>
          <section className="client-info">
            <img src={personImage} alt="person image" />
            <div className="col-1">
              <h3>Name</h3>
              <p>Richa Verma</p>
              <h3>Phone</h3>
              <p>(+91) 919438776</p>
            </div>
            <div className="col-2">
              <h3>Email</h3>
              <p>Richa_Verma@home.com</p>
              <h3>Address</h3>
              <p>
                5-5-102/1, 1st Floor, Anasuya, Behind Ganji Enterprises,
                Ranigunj
              </p>
            </div>
          </section>
        </section>
        <section className="invoices-filters">
          <InvoiceFilters maxRange={1500} minRange={0} />
        </section>

        <section>
          {currentItems.map((inv, index) => (
            <div key={index}>
              {
                <InvoiceRow
                  invoiceNumber={inv.invoiceNumber}
                  invoiceDueDate={inv.invoiceDueDate}
                  invoiceFromBusiness="from besness"
                  invoiceGrandTotal={inv.invoiceGrandTotal}
                  invoiceId={inv.invoiceId}
                  invoiceIssueDate={inv.invoiceIssueDate}
                  invoiceStatus={inv.invoiceStatus}
                  invoiceSubTotal={inv.invoiceSubTotal}
                  invoiceTax={inv.invoiceTax}
                  invoiceToClient="to vlient"
                />
              }
            </div>
          ))}
        </section>

        <section>
          <CountShowSettings
            currentPage={currentPage}
            totalPages={totalPages}
            updateItemsPerPage={updateItemsPerPage}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </section>

        <footer className="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default ClientScreen;
