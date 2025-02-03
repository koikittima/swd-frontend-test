"use client";

import React, { useState } from "react";
import { Table, Button, Typography, Checkbox, CheckboxChangeEvent } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { deleteEntry, TableEntry } from "@/features/table/table-slice";
import { setFormData, resetForm } from "@/features/form/form-slice";
import styles from "@/app/page.module.css";
import dayjs from "dayjs";

const TableComponent: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const tableData = useSelector((state: RootState) => state.table);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  
  const openEdit = (entry?: TableEntry) => {
    if (entry?.id) {
      dispatch(
        setFormData({
          ...entry,
          birth_day: entry.birth_day ? dayjs(entry.birth_day) : null,
        })
      );
    } else {
      dispatch(resetForm());
    }
  };

  const toggleSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedRowKeys(tableData.map((entry) => entry.id));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEntry(id));
  };

  const handleDeleteSelected = () => {
    selectedRowKeys?.forEach((id) => {
      dispatch(deleteEntry(id));
    });
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: t("table.name"),
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a: TableEntry, b: TableEntry) =>
        a.first_name.localeCompare(b.first_name),
    },
    {
      title: t("table.gender"),
      dataIndex: "gender",
      key: "gender",
      render: (value: string) => t(`genders.${value}`, value),
      sorter: (a: TableEntry, b: TableEntry) =>
        a.gender.localeCompare(b.gender),
    },
    {
      title: t("table.phone"),
      dataIndex: "mobile_phone",
      key: "mobile_phone",
      render: (phone: {country_code: string, number: string }) => phone?.number ?  `+${phone.country_code}${phone.number}` : "-",
      sorter: (a: TableEntry, b: TableEntry) =>
        (a.mobile_phone.number || "").localeCompare(
          b.mobile_phone.number || ""
        ),
    },
    {
      title: t("table.nationality"),
      dataIndex: "nationality",
      key: "nationality",
      render: (value: string) => t(`nationality.${value}`, value),
      sorter: (a: TableEntry, b: TableEntry) =>
        a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("table.manage").toUpperCase(),
      key: "manage",
      render: (_: unknown, record: TableEntry) => (
        <div style={{ display: "flex" }}>
          <Typography
            onClick={() => openEdit(record)}
            style={{cursor: "pointer" }}
          >
            {t("table.edit").toUpperCase()}
          </Typography>
          <Typography
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 20,  cursor: "pointer" }}
          >
            {t("table.delete").toUpperCase()}
          </Typography>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={toggleSelectAll}
          checked={
            selectedRowKeys.length === tableData.length && tableData.length > 0
          }
        >
          {t("table.selectAll")}
        </Checkbox>
        <Button
          onClick={handleDeleteSelected}
          className={styles.btnHome}
          style={{ marginLeft: 8 }}
          disabled={selectedRowKeys.length === 0}
        >
          {t("table.deleteSelected").toUpperCase()}
        </Button>
      </div>

      <Table
        dataSource={tableData}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          prevIcon: <span>{t("table.previous")}</span>,
          nextIcon: <span>{t("table.next")}</span>,
          position: ["topRight"],
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedKeys) =>
            setSelectedRowKeys(selectedKeys as string[]),
        }}
      />
    </div>
  );
};

export default TableComponent;
