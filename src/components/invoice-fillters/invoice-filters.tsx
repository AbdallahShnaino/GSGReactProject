import { ChangeEvent } from "react";
import RangeSlider from "../common/range-slider/range-slider";
import counter2arrow from "./../../assets/counter.png";
import counter1arrow from "./../../assets/ic_arrow_drop_down.png";
import { useSearchParams } from "react-router-dom";
import "./invoice-filters.css";
interface IProps {
  minRange: number;
  maxRange: number;
}

const InvoiceFilters = (props: IProps) => {
  const { maxRange, minRange } = props;
  const [params, setParams] = useSearchParams();

  const updateQueryParam = (key: string, value: string) => {
    if (value.length) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setParams(params);
  };

  const handleInputChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      updateQueryParam(key, event.target.value);
    };

  const handleSelectChange =
    (key: string) => (event: ChangeEvent<HTMLSelectElement>) => {
      updateQueryParam(
        key,
        event.target.value === "all" ? "" : event.target.value
      );
    };

  const handleRangeChange =
    (keyMin: string, keyMax: string) => (values: number[]) => {
      if (values[0] !== minRange) params.set(keyMin, values[0].toString());
      else params.delete(keyMin);

      if (values[1] !== maxRange) params.set(keyMax, values[1].toString());
      else params.delete(keyMax);

      setParams(params);
    };

  return (
    <section className="invoice-filters">
      <div className="invoice-filters__element">
        <h3>Company</h3>
        <input
          type="text"
          placeholder="Search"
          value={params.get("company") || ""}
          onChange={handleInputChange("company")}
        />
      </div>
      <div className="invoice-filters__element">
        <h3>Invoice Number</h3>
        <input
          type="text"
          placeholder="Invoice Number"
          value={params.get("inv-num") || ""}
          onChange={handleInputChange("inv-num")}
        />
      </div>
      <div className="invoice-filters__element">
        <div className="invoice-filters__row">
          <h3>Status</h3>
          <img
            className="invoice-filters__dropdown-icon"
            src={counter2arrow}
            alt="Dropdown"
          />
        </div>
        <select
          className="invoice-filters__select"
          value={params.get("inv-status") || "all"}
          onChange={handleSelectChange("inv-status")}
          style={{
            background: `url(${counter1arrow}) no-repeat right 10px center`,
          }}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>
      <div className="invoice-filters__element">
        <h3>Issue Date</h3>
        <input
          type="date"
          value={params.get("inv-issue-date") || ""}
          onChange={handleInputChange("inv-issue-date")}
        />
      </div>
      <div className="invoice-filters__element">
        <h3>Due Date</h3>
        <input
          type="date"
          value={params.get("inv-due-date") || ""}
          onChange={handleInputChange("inv-due-date")}
        />
      </div>
      <div className="invoice-filters__ranges">
        <div className="invoice-filters__element">
          <h3>Tax Range</h3>
          <RangeSlider
            min={minRange}
            max={maxRange}
            hasParam={!!params.get("inv-tax-max")}
            paramMin={Number(params.get("inv-tax-min")) || 0}
            paramMax={Number(params.get("inv-tax-max")) || 0}
            onChange={handleRangeChange("inv-tax-min", "inv-tax-max")}
          />
        </div>
        <div className="invoice-filters__element">
          <h3>Subtotal Range</h3>
          <RangeSlider
            min={minRange}
            max={maxRange}
            hasParam={!!params.get("inv-subtotal-max")}
            paramMin={Number(params.get("inv-subtotal-min")) || 0}
            paramMax={Number(params.get("inv-subtotal-max")) || 0}
            onChange={handleRangeChange("inv-subtotal-min", "inv-subtotal-max")}
          />
        </div>
        <div className="invoice-filters__element">
          <h3>Grand Total Range</h3>
          <RangeSlider
            min={minRange}
            max={maxRange}
            hasParam={!!params.get("inv-grandtotal-max")}
            paramMin={Number(params.get("inv-grandtotal-min")) || 0}
            paramMax={Number(params.get("inv-grandtotal-max")) || 0}
            onChange={handleRangeChange(
              "inv-grandtotal-min",
              "inv-grandtotal-max"
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default InvoiceFilters;
