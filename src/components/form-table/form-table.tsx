"use client";

import { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  Button,
  Row,
  Col,
  Space,
} from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setFormData } from "@/features/form/form-slice";
import { addEntry, updateEntry } from "@/features/table/table-slice";
import styles from "@/app/page.module.css";
import { v4 as uuidv4 } from "uuid";
import { Dayjs } from "dayjs";

const { Option } = Select;

interface FormValues {
  id: string;
  title: string;
  first_name: string;
  last_name: string;
  birth_day: Dayjs | null;
  nationality: string;
  citizen: string;
  gender: string;
  mobile_phone: {
    country_code: string;
    number: string;
  };
  passport_no: string;
  expected_salary: number | "";
}

const initialFormState: FormValues = {
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
};

const FormTableComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.form);
  const tableData = useSelector((state: RootState) => state.table);
  const [form] = Form.useForm();

  const phoneOptions = [
    { value: "66", label: t("phone.thai") },
    { value: "1", label: t("phone.usa") },
  ];

  const nationalityOptions = [
    { value: "thai", label: t("nationality.thai") },
    { value: "american", label: t("nationality.american") },
    { value: "japanese", label: t("nationality.japanese") },
    { value: "french", label: t("nationality.french") },
  ];

  const titleOptions = [
    { value: "mr", label: t("title.mr") },
    { value: "mrs", label: t("title.mrs") },
    { value: "ms", label: t("title.ms") },
  ];

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleValuesChange = (allValues: FormValues) => {
    dispatch(setFormData(allValues));
  };

  const handleCitizenChange = (value: string, index: number) => {
    const newCitizen = formData.citizen.split("");
    const segmentLengths = [1, 4, 5, 2, 1];

    const startIdx = segmentLengths.slice(0, index).reduce((a, b) => a + b, 0);
    newCitizen.splice(startIdx, segmentLengths[index], ...value.split(""));

    const updatedCitizen = newCitizen.join("");

    form.setFieldsValue({ citizen: updatedCitizen });

    dispatch(setFormData({ citizen: updatedCitizen }));
  };

  const handleSubmit = async (values: FormValues) => {
    const entry = { ...values, id: values.id || formData.id || uuidv4() };

    const currentTableData = Array.isArray(tableData) ? tableData : [];

    const isExistingEntry = currentTableData?.some(
      (item) => item?.id === entry?.id
    );

    const updatedTableData = isExistingEntry
      ? currentTableData?.map((item) => (item?.id === entry?.id ? entry : item))
      : [...currentTableData, entry];

    localStorage.setItem("tableData", JSON.stringify(updatedTableData));

    if (isExistingEntry) {
      alert(t("alert.updateSuccess"));
      dispatch(updateEntry(entry));
    } else {
      alert(t("alert.saveSuccess"));
      dispatch(addEntry(entry));
    }
    setTimeout(() => {
      dispatch(setFormData(initialFormState));
      form.resetFields();
    }, 0);
  };

  const handleReset = () => {
    dispatch(setFormData(initialFormState));
    form.resetFields();
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <Form
        form={form}
        className={styles.formContainer}
        layout="horizontal"
        labelCol={{ flex: "120px" }}
        wrapperCol={{ flex: "auto" }}
        labelAlign="left"
        initialValues={formData}
        onValuesChange={handleValuesChange}
        onFinish={handleSubmit}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label={t("form.title")}
              name="title"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Select>
                {titleOptions?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label={t("form.first_name")}
              name="first_name"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label={t("form.last_name")}
              name="last_name"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label={t("form.birth_day")}
              name="birth_day"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label={t("form.nationality")}
              name="nationality"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Select>
                {nationalityOptions?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={9} />
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={t("form.citizen")} name="citizen">
              <Input.Group compact>
                <Input
                  style={{ width: 50 }}
                  maxLength={1}
                  value={formData.citizen.slice(0, 1)}
                  onChange={(e) => handleCitizenChange(e.target.value, 0)}
                />
                <span style={{ margin: "0 8px" }}>-</span>
                <Input
                  style={{ width: 80 }}
                  maxLength={4}
                  value={formData.citizen.slice(1, 5)}
                  onChange={(e) => handleCitizenChange(e.target.value, 1)}
                />
                <span style={{ margin: "0 8px" }}>-</span>
                <Input
                  style={{ width: 100 }}
                  maxLength={5}
                  value={formData.citizen.slice(5, 10)}
                  onChange={(e) => handleCitizenChange(e.target.value, 2)}
                />
                <span style={{ margin: "0 8px" }}>-</span>
                <Input
                  style={{ width: 50 }}
                  maxLength={2}
                  value={formData.citizen.slice(10, 12)}
                  onChange={(e) => handleCitizenChange(e.target.value, 3)}
                />
                <span style={{ margin: "0 8px" }}>-</span>
                <Input
                  style={{ width: 50 }}
                  maxLength={1}
                  value={formData.citizen.slice(12, 13)}
                  onChange={(e) => handleCitizenChange(e.target.value, 4)}
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={12} />
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={t("form.gender")}
              name="gender"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Radio.Group>
                <Radio value="male">{t("form.male")}</Radio>
                <Radio value="female">{t("form.female")}</Radio>
                <Radio value="unsex">{t("form.unsex")}</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12} />
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={t("form.mobile_phone")} >
              <Space.Compact>
                <Form.Item
                  name={["mobile_phone", "country_code"]}
                  noStyle
                  rules={[{ required: true, message: t("form.required") }]}
                >
                  <Select style={{ width: 150 }}>
                    {phoneOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <span style={{ margin: "0 8px" }}>-</span>

                <Form.Item
                  name={["mobile_phone", "number"]}
                  noStyle
                  rules={[{ required: true, message: t("form.required") }]}
                >
                  <Input style={{ width: 150 }} maxLength={10} />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>
          <Col span={12} />
        </Row>

        <Row gutter={24}>
          <Col span={10}>
            <Form.Item label={t("form.passport_no")} name="passport_no">
              <Input />
            </Form.Item>
            <Col span={14}></Col>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={10}>
            <Form.Item
              label={t("form.expected_salary")}
              name="expected_salary"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
          <Col span={3}>
            <Button
              className={styles.btnHome}
              htmlType="reset"
              onClick={() => handleReset()}
            >
              {t("button.reset").toUpperCase()}
            </Button>
          </Col>
          <Col span={3}>
            <Button className={styles.btnHome} htmlType="submit">
              {t("button.submit").toUpperCase()}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default FormTableComponent;
