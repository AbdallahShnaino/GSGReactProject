import "./count-show-settings.css";
import leftIcon from "./../../assets/icons8-back_filled.png";
import rightIcon from "./../../assets/icons8-right.png";
import counter1arrow from "./../../assets/ic_arrow_drop_down.png";

interface IProps {
  currentPage: number;
  totalPages: number;
  updateItemsPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPreClick(): void;
  onNextClick(): void;
}
const CountShowSettings = (props: IProps) => {
  return (
    <section className="show-settings">
      <div>
        <button disabled={props.currentPage == 1}>
          <img
            src={leftIcon}
            alt="icon arrow left"
            onClick={props.onPreClick}
          />
        </button>
        <span>
          {props.currentPage} / {props.totalPages}
        </span>
        <button disabled={props.currentPage == props.totalPages}>
          <img
            src={rightIcon}
            alt="icon arrow right"
            onClick={props.onNextClick}
          />
        </button>
      </div>
      <div>
        <span>Rows per page</span>
        <select
          onChange={props.updateItemsPerPage}
          style={{
            background: `url(${counter1arrow}) no-repeat right 10px center`,
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </section>
  );
};

export default CountShowSettings;
