import React from "react";
import { Table } from "antd";
import "./style.css"; // Import custom CSS for additional styling

const CustomTable = ({
    columns,
    dataSource,
    onSortChange,
    scroll,
    rowKey,
    pagination = false,
}) => {
    const handleTableChange = (pagination, filters, sorter) => {
        if (sorter && sorter.field) {
            onSortChange(sorter.field, sorter.order);
        } else {
            onSortChange(null, null);
        }
    };
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            rowKey={(record) => record[rowKey]}
            onChange={handleTableChange} // Handle sorting changes
            className="custom-table"
            scroll={scroll} // {x: 1300, y: 800}

        />
    );
};

export default CustomTable;