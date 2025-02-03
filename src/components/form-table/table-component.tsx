"use client";

import React, { useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const initialData: DataType[] = [
  { key: "1", name: "John Doe", age: 32, address: "New York, USA" },
  { key: "2", name: "Jane Smith", age: 28, address: "London, UK" },
  { key: "3", name: "Sam Green", age: 36, address: "Sydney, Australia" },
  { key: "4", name: "Anna Lee", age: 30, address: "Toronto, Canada" },
];

const TableComponent: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);


  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };

  const columns: ColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 2 }}
    />
  );
};

export default TableComponent;
