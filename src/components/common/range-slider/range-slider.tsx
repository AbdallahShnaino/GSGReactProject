import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import "./range-slider.css";

interface RangeSliderProps {
  min: number;
  max: number;
  onChange: (values: number[]) => void;
  hasParam: boolean;
  paramMax?: number;
  paramMin?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  onChange,
  hasParam,
  paramMax,
  paramMin,
}) => {
  const [values, setValues] = useState<number[]>([min, max]);

  useEffect(() => {
    if (hasParam) {
      setValues([paramMin!, paramMax!]);
    }
  }, [hasParam, paramMin, paramMax]);

  const handleChange = (values: number[]) => {
    setValues(values);
    onChange(values);
  };

  return (
    <div className="range-slider">
      <div className="range-slider__values">
        <span className="range-slider__value">{values[0]}$</span>
        <span className="range-slider__value">{values[1]}$</span>
      </div>
      <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => {
          const { key, ...restProps } = props;
          return (
            <div
              {...restProps}
              className="range-slider__track"
              style={{
                ...restProps.style,
                background: getTrackBackground({
                  values,
                  colors: ["#9ADBB8", "#31885A", "#9ADBB8"],
                  min,
                  max,
                }),
              }}
              key={key || "unique-key"}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props, isDragged }) => {
          const { key, ...restProps } = props;
          return (
            <div
              {...restProps}
              className="range-slider__thumb"
              key={key || "unique-thumb-key"}
            />
          );
        }}
      />
    </div>
  );
};

export default RangeSlider;
