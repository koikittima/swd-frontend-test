"use client";

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
import { updateFormData } from "@/features/form/form-slice";
import styles from "@/app/page.module.css";
const { Option } = Select;

const titleOptions = [
  { value: "mr", label: "Mr." },
  { value: "mrs", label: "Mrs." },
  { value: "ms", label: "Ms." },
];

const nationalityOptions = [
  { value: "thai", label: "Thai" },
  { value: "american", label: "American" },
  { value: "japanese", label: "Japanese" },
  { value: "french", label: "French" },
];

const phoneOptions = [
  { value: "66", label: "🇹🇭 +66" },
  { value: "1", label: "🇺🇸 +1" },
  { value: "81", label: "🇯🇵 +81" },
  { value: "33", label: "🇫🇷 +33" },
];

const FormTableComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.form);
  const [form] = Form.useForm();

  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log("allValues", allValues);
    dispatch(updateFormData(allValues));
  };

  const handleCitizenChange = (value: string, index: number) => {
    let newCitizen = formData.citizen.split("");
    let segmentLengths = [1, 4, 5, 2, 1];

    let startIdx = segmentLengths.slice(0, index).reduce((a, b) => a + b, 0);
    newCitizen.splice(startIdx, segmentLengths[index], ...value.split(""));

    let updatedCitizen = newCitizen.join("");

    form.setFieldsValue({ citizen: updatedCitizen });
    dispatch(updateFormData({ citizen: updatedCitizen }));
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
      >
        {/* Row 1: Title, First Name, Last Name */}
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label={t("form.title")}
              name="title"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Select>
                {titleOptions.map((option) => (
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

        {/* Row 2: Birth Date & Nationality */}
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
                {nationalityOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={9} />
        </Row>

        {/* Row 3: Citizen ID (Label & Input อยู่แถวเดียวกัน) */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label={t("form.citizen")} name="citizen">
              <Input.Group>
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

        {/* Row 4: Gender */}
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

        {/* Row 5: Mobile Phone */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={t("form.mobile_phone")}
              name="mobile_phone"
              rules={[{ required: true, message: t("form.required") }]}
            >
              <Space.Compact>
                <Select style={{ width: 150 }}>
                  {phoneOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <span style={{ margin: "0 8px" }}>-</span>
                <Input style={{ width: 150 }} maxLength={10} />
              </Space.Compact>
            </Form.Item>
          </Col>
          <Col span={12} />
        </Row>

        {/* Row 6: Expected Salary */}
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
          <Col span={14} />
        </Row>

        {/* Row 7: Submit Button */}
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              {t("button.submit")}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default FormTableComponent;
