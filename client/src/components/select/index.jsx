import React from "react";
import { AutoComplete } from "antd";
import { Controller } from "react-hook-form";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./select.css";

const CustomSelect = ({
    name,
    control,
    rules,
    options = [], // Array of select options
    defaultValue = "",
    placeholder = "Please select",
    showErrorIcon = true,
    style,
    onSelect,
    value,
    handleSearch,
    customError,
    notFoundContent
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || undefined}
            render={({ field, fieldState: { error } }) => (
                <>
                    <AutoComplete
                        {...field}
                        value={value}
                        options={options}
                        style={style}
                        onSelect={onSelect}
                        onSearch={handleSearch}
                        placeholder={placeholder}
                        notFoundContent={notFoundContent}
                    />
                    {(error || customError) && (
                        <span
                            style={{
                                color: `var(--color-error)`,
                                display: "flex",
                                alignItems: "center",
                                marginTop: "5px",
                            }}
                        >
                            {showErrorIcon && (
                                <InfoCircleOutlined style={{ marginRight: 5 }} />
                            )}
                            {error?.message || customError}
                        </span>
                    )}
                </>
            )}
        />
    );
};

export default CustomSelect;

