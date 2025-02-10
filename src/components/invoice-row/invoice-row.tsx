import "./invoice-row.css";
import { useEffect, useState } from "react";
import eye from "./../../assets/Eye.png";
import { IInvoice, InvoiceStatus } from "../../@types";

const InvoiceRow = (props: IInvoice) => {
  const [showIDetails, setShowIDetails] = useState<boolean>(false);
  const invoiceStatusColor =
    props.invoiceStatus == InvoiceStatus.PAID ? "#25563d" : "#db4646";

  const showIonShow = {
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "center",
  };
  const showIonHide = {
    display: "none",
  };
  function showInvoiceDetails(
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setShowIDetails((prev) => !prev);
  }
  useEffect(() => {
    console.log("Updated showIDetails:", showIDetails);
  }, [showIDetails]);
  return (
    <section className="invoice-elements">
      <div className="item">
        <div className="invoice-element">
          <span className="company-name">{props.invoiceFromBusiness}</span>
          <span className="invoice-number">{props.invoiceNumber}</span>
          <span
            className={
              props.invoiceStatus == InvoiceStatus.PAID
                ? "invoice-status paid"
                : "invoice-status unpaid"
            }
          >
            {props.invoiceStatus}
          </span>
          <span className="invoice-issue-date">{props.invoiceIssueDate}</span>
          <span className="invoice-due-date">{props.invoiceDueDate}</span>
          <span className="invoice-tax">{props.invoiceTax.toString()}$</span>
          <span className="invoice-subtotal">
            {props.invoiceSubTotal.toString()}$
          </span>
          <span className="invoice-grand-total">
            {props.invoiceGrandTotal.toString()}$
          </span>
          <button className="invoice-more-btn" onClick={showInvoiceDetails}>
            <img src={eye} alt="more button" />
          </button>
        </div>
        <div
          style={showIDetails ? showIonShow : showIonHide}
          className="more-data"
        >
          <div>
            <span className="title">Invoice Number </span>
            <span>{props.invoiceNumber}</span>
          </div>
          <div>
            <span className="title">Invoice Status </span>

            <span className="data" style={{ color: invoiceStatusColor }}>
              {props.invoiceStatus == InvoiceStatus.PAID ? "Paid" : "Unpaid"}
            </span>
          </div>
          <div>
            <span className="title">Taxes </span>
            <span className="data">{props.invoiceTax}$</span>
          </div>
          <div>
            <span className="title">Invoice Subtotal </span>
            <span className="data">{props.invoiceSubTotal}$</span>
          </div>
          <div>
            <span className="title">Invoice Grand Total </span>
            <span className="data">{props.invoiceGrandTotal}$</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceRow;
