"use client";

import {
  Button,
  Flex,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import FormTableComponent  from "@/components/form-table/form-table";
import TableComponent from "@/components/form-table/table-component";
import styles from "../../page.module.css";
import LanguageForm from "@/components/language/language-form";

const { Title } = Typography;

const FormTablePage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <Flex justify="space-between" align="start">
        <Title level={1}>{t("form_table")}</Title>
        <LanguageForm />
      </Flex>
      <Flex justify="end" align="start" style={{ marginBottom: "20px" }}>
        <Button
          className={styles.btnHome}
          onClick={() => window.history.back()}
        >
          {t("home")}
        </Button>
      </Flex>
      <FormTableComponent />
      <TableComponent />
    </div>
  );
};
export default FormTablePage;
