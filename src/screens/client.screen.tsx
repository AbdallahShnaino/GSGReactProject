import "./client.screen.css";
import Header from "../components/common/header/header";
import InvoiceRow from "../components/invoice-row/invoice-row";
import Footer from "../components/common/footer/footer";
import InvoiceFilters from "../components/invoice-fillters/invoice-filters";
import CountShowSettings from "../components/count-show-settings/count-show-settings";
import personImage from "./../assets/person.png";
import { IInvoice } from "../@types";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { InvoicesStateContext } from "../providers/invoices-state.provider";

const ClientScreen = () => {
  const [params, setParams] = useSearchParams();
  const { state, loading } = useContext(InvoicesStateContext);
  const { invoicesList } = state;
  const [filtering, setFiltering] = useState(false);
  const [filteredInvoices, setFilteredInvoices] =
    useState<IInvoice[]>(invoicesList);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setFiltering(true);
    let filteredList = invoicesList;

    const company = params.get("company") || "";
    const invoiceNumber = params.get("inv-num") || "";
    const invoiceStatus = params.get("inv-status") || "";
    const invoiceIssueDate = params.get("inv-issue-date") || "";
    const invoiceDueDate = params.get("inv-due-date") || "";
    const invoiceGrandTotalMin = parseInt(
      params.get("inv-grandtotal-min") || "0"
    );
    const invoiceGrandTotalMax = parseInt(
      params.get("inv-grandtotal-max") || "Infinity"
    );
    const invoiceSubtotalMin = parseInt(params.get("inv-subtotal-min") || "0");
    const invoiceSubtotalMax = parseInt(
      params.get("inv-subtotal-max") || "Infinity"
    );
    const invoiceTaxMin = parseInt(params.get("inv-tax-min") || "0");
    const invoiceTaxMax = parseInt(params.get("inv-tax-max") || "1500");

    if (params.size) {
      if (company) {
        filteredList = filteredList.filter((inv) =>
          inv.invoiceFromBusiness.toLowerCase().includes(company.toLowerCase())
        );
      }
      if (invoiceNumber) {
        filteredList = filteredList.filter(
          (inv) =>
            inv.invoiceNumber.toLowerCase() === invoiceNumber.toLowerCase()
        );
      }
      if (invoiceStatus) {
        filteredList = filteredList.filter(
          (inv) => inv.invoiceStatus === invoiceStatus.toUpperCase()
        );
      }
      if (invoiceIssueDate) {
        filteredList = filteredList.filter(
          (inv) => inv.invoiceIssueDate === invoiceIssueDate
        );
      }
      if (invoiceDueDate) {
        console.log(invoiceDueDate);
        filteredList = filteredList.filter(
          (inv) => inv.invoiceDueDate === invoiceDueDate
        );
      }
      if (invoiceTaxMin || invoiceTaxMax) {
        filteredList = filteredList.filter(
          (inv) =>
            inv.invoiceTax >= invoiceTaxMin && inv.invoiceTax <= invoiceTaxMax
        );
      }
      if (invoiceSubtotalMin || invoiceSubtotalMax) {
        filteredList = filteredList.filter(
          (inv) =>
            inv.invoiceSubTotal >= invoiceSubtotalMin &&
            inv.invoiceSubTotal <= invoiceSubtotalMax
        );
      }
      if (invoiceGrandTotalMin || invoiceGrandTotalMax) {
        filteredList = filteredList.filter(
          (inv) =>
            inv.invoiceGrandTotal >= invoiceGrandTotalMin &&
            inv.invoiceGrandTotal <= invoiceGrandTotalMax
        );
      }
    } else {
      filteredList = invoicesList;
    }
    const totalInvoices = filteredList.length;
    setTotalPages(Math.ceil(totalInvoices / itemsPerPage));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentInvoices = filteredList.slice(startIndex, endIndex);
    setFilteredInvoices(currentInvoices);

    setFiltering(false);
  }, [params, invoicesList, currentPage, itemsPerPage]);

  const onPreClick = () => {
    setCurrentPage((prev) => {
      const value = Math.max(prev - 1, 1);
      params.set("page", value.toString());
      setParams(params);
      return value;
    });
  };

  const onNextClick = () => {
    setCurrentPage((prev) => {
      const value = Math.min(prev + 1, totalPages);
      params.set("page", value.toString());
      setParams(params);
      return value;
    });
  };

  const updateItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  return (
    <>
      <div className="client client--bold">
        <section className="client__header">
          <Header />
        </section>
        <section>
          <section className="client__info">
            <img
              src={personImage}
              alt="person image"
              className="client__info-image"
            />
            <div className="client__info-col">
              <h3 className="client__info-title">Name</h3>
              <p className="client__info-text">Richa Verma</p>
              <h3 className="client__info-title">Phone</h3>
              <p className="client__info-text">(+91) 919438776</p>
            </div>
            <div className="client__info-col">
              <h3 className="client__info-title">Email</h3>
              <p className="client__info-text">Richa_Verma@home.com</p>
              <h3 className="client__info-title">Address</h3>
              <p className="client__info-text">
                5-5-102/1, 1st Floor, Anasuya, Behind Ganji Enterprises,
                Ranigunj
              </p>
            </div>
            <div className="client__overview-col">
              <h3 className="client__overview-title">
                Number of Associated Invoices
              </h3>
              <p className="client__overview-text">123</p>
              <h3 className="client__overview-title">Paid</h3>
              <p className="client__overview-text">123</p>
              <h3 className="client__overview-title">Waiting to Pay</h3>
              <p className="client__overview-text">123</p>
            </div>
          </section>
        </section>

        <section className="client__filters">
          <InvoiceFilters maxRange={1500} minRange={0} />
        </section>

        <section className="client__invoices">
          <h2>My Invoices List</h2>

          {filtering || loading ? (
            <div className="spinner"></div>
          ) : filteredInvoices && filteredInvoices.length > 0 ? (
            filteredInvoices.map((inv, index) => (
              <div key={index} className="client__invoice-item">
                <InvoiceRow
                  invoiceNumber={inv.invoiceNumber}
                  invoiceDueDate={inv.invoiceDueDate}
                  invoiceFromBusiness={inv.invoiceFromBusiness}
                  invoiceGrandTotal={inv.invoiceGrandTotal}
                  invoiceId={inv.invoiceId}
                  invoiceIssueDate={inv.invoiceIssueDate}
                  invoiceStatus={inv.invoiceStatus}
                  invoiceSubTotal={inv.invoiceSubTotal}
                  invoiceTax={inv.invoiceTax}
                  invoiceToClient="to client"
                />
              </div>
            ))
          ) : (
            <h3 className="client__no-results">No results found!</h3>
          )}
        </section>

        <section className="client__pagination">
          <CountShowSettings
            currentPage={currentPage}
            totalPages={totalPages}
            updateItemsPerPage={updateItemsPerPage}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </section>

        <footer className="client__footer">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default ClientScreen;
