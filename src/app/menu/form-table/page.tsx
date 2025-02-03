"use client";

import {
  Button,
  Flex,
  Typography,
} from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setFormData } from "@/features/form/form-slice";
import FormTableComponent  from "@/components/form-table/form-table";
import TableComponent from "@/components/form-table/table-component";
import styles from "../../page.module.css";
import LanguageForm from "@/components/language/language-form";

const { Title } = Typography;

const FormTablePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleBack = () => {
    window.history.back();
      dispatch(setFormData({
        id: "",
        title: "",
        first_name: "",
        last_name: "",
        birth_day: null,
        nationality: "",
        citizen: "",
        gender: "",
        mobile_phone: { country_code: "", number: "" },
        passport_no: "",
        expected_salary: "",
      }));
  }

  return (
    <div className={styles.page}>
      <Flex justify="space-between" align="start">
        <Title level={1}>{t("form_table")}</Title>
        <LanguageForm />
      </Flex>
      <Flex justify="end" align="start" style={{ marginBottom: "20px" }}>
        <Button
          className={styles.btnHome}
          onClick={() => handleBack()}
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
