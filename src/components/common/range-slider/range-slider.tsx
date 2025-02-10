import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import "./range-slider.css";
interface RangeSliderProps {
  min: number;
  max: number;
  onChange: (values: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, onChange }) => {
  // Initialize the range with min and max values
  const [values, setValues] = useState<number[]>([min, max]);

  const handleChange = (values: number[]) => {
    setValues(values);
    onChange(values);
  };

  return (
    <div className="slider">
      <div
        //ranges tests
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <span>{values[0]}$</span>
        <span>{values[1]}$</span>
      </div>
      <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values,
                colors: ["#9ADBB8", "#31885A", "#9ADBB8"],
                min,
                max,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#204734",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          />
        )}
      />
    </div>
  );
};

export default RangeSlider;
