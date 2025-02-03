"use client";
import {Form, Select, } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setFormLanguage } from "../../features/form/form-language";
import { RootState } from "../../store";


interface LanguageOption {
  code: string;
  label: string;
}

const LanguageForm = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const language = useSelector(
    (state: RootState) => state.formLanguage.language
  );

  const languages: LanguageOption[] = [
    { code: "en", label: t("language_en") },
    { code: "th", label: t("language_th") },
  ];

  const handleLanguageChange = (value: string) => {
    dispatch(setFormLanguage(value));
    i18n.changeLanguage(value);
  };

  return (
    <div>
       <Form initialValues={{ language }}>
            <Form.Item label="" name="language" >
              <Select value={language} onChange={handleLanguageChange}  style={{ minWidth: 80}}>
                {languages?.map((lang) => (
                  <Select.Option key={lang?.code} value={lang?.code} >
                    {lang?.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
    </div>
  );
};

export default LanguageForm;

