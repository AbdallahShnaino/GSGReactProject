import { ChangeEvent, useState } from "react";
import RangeSlider from "../common/range-slider/range-slider";
import counter2arrow from "./../../assets/counter.png";
import counter1arrow from "./../../assets/ic_arrow_drop_down.png";
import { useSearchParams } from "react-router-dom";
interface IProps {
  minRange: number;
  maxRange: number;
}
const InvoiceFilters = (props: IProps) => {
  const [selectedIssueDate, setSelectedIssueDate] = useState("");
  const [selectedDeuDate, setSelectedDeuDate] = useState("");

  const [params, setParams] = useSearchParams();
  const handleCompanySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length) {
      params.set("company", query);
    } else {
      params.delete("company");
    }
    setParams(params);
  };
  const handleInvNumberSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    if (query.length) {
      params.set("inv-num", query);
    } else {
      params.delete("inv-num");
    }
    setParams(params);
  };
  const handleInvStatusSearch = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const query = event.target.value;
    if (query === "all") {
      params.delete("inv-status");
    } else {
      params.set("inv-status", query);
    }
    setParams(params);
  };
  function handleIssueDateChange(event: ChangeEvent<HTMLInputElement>): void {
    const query = event.target.value;
    if (query.length) {
      params.set("inv-issue-date", query);
    } else {
      params.delete("inv-issue-date");
    }
    setSelectedIssueDate(query);
    setParams(params);
  }
  function handleDueDateChange(event: ChangeEvent<HTMLInputElement>): void {
    const query = event.target.value;
    if (query.length) {
      params.set("inv-due-date", query);
    } else {
      params.delete("inv-due-date");
    }
    setSelectedDeuDate(query);
    setParams(params);
  }
  function handleTaxRangeChange(queries: number[]) {
    if (queries[0] != props.minRange) {
      params.set("inv-tax-min", queries[0].toString());
    }
    if (queries[1] != props.maxRange) {
      params.set("inv-tax-max", queries[1].toString());
    }
    if (queries[1] == props.maxRange) {
      params.delete("inv-tax-max");
    }
    if (queries[0] == props.minRange) {
      params.delete("inv-tax-min");
    }
    setParams(params);
  }
  function handleSubtotalRangeChange(queries: number[]) {
    if (queries[0] != props.minRange) {
      params.set("inv-subtotal-min", queries[0].toString());
    }
    if (queries[1] != props.maxRange) {
      params.set("inv-subtotal-max", queries[1].toString());
    }
    if (queries[1] == props.maxRange) {
      params.delete("inv-subtotal-max");
    }
    if (queries[0] == props.minRange) {
      params.delete("inv-subtotal-min");
    }
    setParams(params);
  }
  function handleGrandTotalRangeChange(queries: number[]) {
    if (queries[0] != props.minRange) {
      params.set("inv-grandtotal-min", queries[0].toString());
    }
    if (queries[1] != props.maxRange) {
      params.set("inv-grandtotal-max", queries[1].toString());
    }
    if (queries[1] == props.maxRange) {
      params.delete("inv-grandtotal-max");
    }
    if (queries[0] == props.minRange) {
      params.delete("inv-grandtotal-min");
    }
    setParams(params);
  }

  return (
    <section className="invoices-filters">
      <div className="filter-element">
        <h3>Company</h3>
        <input
          id="text-input"
          type="text"
          placeholder="Search"
          onChange={handleCompanySearch}
        />
      </div>
      <div className="filter-element">
        <h3>Invoice Number</h3>
        <input
          id="text-input"
          type="text"
          placeholder="Invoice Number"
          onChange={handleInvNumberSearch}
        />
      </div>
      <div className="filter-element">
        <div className="row">
          <h3>Status</h3>
          <img id="drop-down-arrows" src={counter2arrow} alt="2 arrows" />
        </div>
        <div className="status-select">
          <select
            onChange={handleInvStatusSearch}
            style={{
              background: `url(${counter1arrow}) no-repeat right 10px center`,
            }}
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>
      <div className="filter-element issue-date">
        <h3>Issue Date</h3>
        <input
          type="date"
          id="issue-date"
          name="issue-date"
          min="2025-01-01"
          value={selectedIssueDate}
          onChange={handleIssueDateChange}
        />
      </div>
      <div className="filter-element due-date">
        <h3>Due Date</h3>
        <input
          type="date"
          id="due-date"
          name="due-date"
          min="2025-01-01"
          value={selectedDeuDate}
          onChange={handleDueDateChange}
        />
      </div>
      <div className="filter-element range">
        <h3>Tax Range</h3>
        <RangeSlider
          min={props.minRange}
          max={props.maxRange}
          onChange={handleTaxRangeChange}
        />
      </div>
      <div className="filter-element range">
        <h3>Subtotal Range</h3>
        <RangeSlider
          min={props.minRange}
          max={props.maxRange}
          onChange={handleSubtotalRangeChange}
        />
      </div>
      <div className="filter-element range">
        <h3>Grand Total Range</h3>
        <RangeSlider
          min={props.minRange}
          max={props.maxRange}
          onChange={handleGrandTotalRangeChange}
        />
      </div>
    </section>
  );
};

export default InvoiceFilters;
