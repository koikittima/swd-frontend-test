"use client";
import { Flex, Card, Row, Col } from "antd";
import Link from "next/link";
import styles from "./page.module.css";
import { useTranslation } from "react-i18next";
import LanguageForm from "@/components/language/language-form";


const Home = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Flex justify="end" align="start">
         <LanguageForm />
        </Flex>

        <Row
          gutter={12}
          justify="center"
          align="middle"
          style={{ height: "400px" }}
        >
          <Col md={12} lg={6}>
          <Link href={`/menu/layout-style`} passHref>
            <Card
              title={t("test_1")}
              bordered={false}
              className={styles.customCard}
            >
              <p>{t("layout_style")}</p>
            </Card>
            </Link>
          </Col>
          <Col md={12} lg={6}>
          <Link href={`/menu/form-table`} passHref>
          <Card
              title={t("test_2")}
              bordered={false}
              className={styles.customCard}
            >
              <p>{t("form_table")}</p>
            </Card>
          </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
