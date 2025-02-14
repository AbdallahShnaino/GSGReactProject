import "./count-show-settings.css";
import leftIcon from "./../../assets/icons8-back_filled.png";
import rightIcon from "./../../assets/icons8-right.png";
import counterArrow from "./../../assets/ic_arrow_drop_down.png";

interface IProps {
  currentPage: number;
  totalPages: number;
  updateItemsPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPreClick(): void;
  onNextClick(): void;
}

const CountShowSettings: React.FC<IProps> = ({
  currentPage,
  totalPages,
  updateItemsPerPage,
  onPreClick,
  onNextClick,
}) => {
  return (
    <section className="count-show-settings">
      <div className="count-show-settings__pagination">
        <button
          className="count-show-settings__button"
          disabled={currentPage === 1}
          onClick={onPreClick}
        >
          <img src={leftIcon} alt="Previous page" />
        </button>
        <span className="count-show-settings__page-info">
          {currentPage} / {totalPages}
        </span>
        <button
          className="count-show-settings__button"
          disabled={currentPage === totalPages}
          onClick={onNextClick}
        >
          <img src={rightIcon} alt="Next page" />
        </button>
      </div>
      <div className="count-show-settings__rows">
        <span className="count-show-settings__label">Rows per page</span>
        <select
          className="count-show-settings__select"
          onChange={updateItemsPerPage}
          style={{
            background: `url(${counterArrow}) no-repeat right 10px center`,
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
