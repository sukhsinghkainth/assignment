import React from "react";
import { Select } from "antd";
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
    onChange,
    handleSeacrh,
    value,
    notFoundContent,
    customError
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}

            defaultValue={defaultValue || undefined}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Select
                        {...field}
                        showSearch
                        value={value || undefined}
                        placeholder={placeholder}
                        className={`custom-select  ${error ? "error" : ""}`}
                        options={options}
                        filterOption={(input, option) => {
                            return option.key.toLowerCase().includes(input.trim().toLowerCase());
                        }}
                        style={style}
                        onChange={(value) => {
                            field.onChange(value);
                            onChange && onChange(value);
                        }}
                        onSearch={handleSeacrh}
                        allowClear={false}
                        notFoundContent={notFoundContent}
                        suffixIcon={null}
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

