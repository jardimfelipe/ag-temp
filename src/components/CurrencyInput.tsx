import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface Props {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CurrencyInput = forwardRef<NumericFormatProps, Props>(
  function CurrencyInput(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        decimalSeparator=","
        valueIsNumericString
      />
    );
  }
);

export default CurrencyInput;
