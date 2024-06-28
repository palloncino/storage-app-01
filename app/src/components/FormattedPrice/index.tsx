// src/components/FormattedPrice/index.tsx

import React from "react";
import { NumericFormat } from "react-number-format";

interface FormattedPriceProps {
    value: number;
    prefix?: string;
}

const FormattedPrice: React.FC<FormattedPriceProps> = ({ value, prefix = "€" }) => {
    return (
        <NumericFormat
            value={value}
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            prefix={prefix}
        />
    );
};

export default FormattedPrice;
