"use client";
import { useState } from "react";
import { Row, Col, Card, Typography, Flex } from "antd";
import styles from "../../page.module.css";
import { useTranslation } from "react-i18next";
import LanguageForm from "@/components/language/language-form";

const LayoutStylePage = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState([
    "Rectangle",
    "Oval",
    "Square",
    "Circle",
    "Trapezoid",
    "Parallelogram",
  ]);

  const triangleDirections: string[] = ["left", "up_down", "right"];

  const shuffleShapes = (index: number) => {
    const shuffledShapes = [...shapes];
    const shape = shuffledShapes.splice(index, 1)[0];
    const randomIndex = Math.floor(Math.random() * shuffledShapes.length);
    shuffledShapes.splice(randomIndex, 0, shape);
    setShapes(shuffledShapes);
  };

  const moveShape = (direction: string) => {
    const shuffledShapes = [...shapes];
    if (direction === "up_down") {
      shuffledShapes.reverse();
    } else if (direction === "left") {
      const first = shuffledShapes.shift();
      shuffledShapes.push(first!);
    } else if (direction === "right") {
      const last = shuffledShapes.pop();
      shuffledShapes.unshift(last!);
    }
    setShapes(shuffledShapes);
  };

  const getShapeClass = (shape: string) => styles[shape.toLowerCase()] || "";

  return (
    <div className={styles.page}>
      <Flex justify="space-between" align="start">
        <Typography.Title level={1}>{t("layout_style")}</Typography.Title>
        <LanguageForm />
      </Flex>
      <Row gutter={16} justify="center">
        <Col span={24}>
          <Row gutter={16} justify="center">
            {triangleDirections?.map((dir) => (
              <Col
                key={dir}
                span={dir === "up_down" ? 8 : 4}
                className={styles.triangleWrapper}
                onClick={() => moveShape(dir)}
              >
                {dir === "up_down" ? (
                  <div>
                    <Card className={styles.cardShape}>
                      <Row gutter={16} justify="space-between">
                        <Col span={8}>
                          <div className={styles.triangleUp}></div>
                        </Col>
                        <Col span={8}>
                          <div className={styles.triangleDown}></div>
                        </Col>
                      </Row>
                    </Card>
                    <div className={styles.btnContainer}>
                      <div className={styles.btnName}>{t("move_position")}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Card className={styles.cardShape}>
                      <div
                        className={
                          styles[
                            `triangle${
                              dir.charAt(0).toUpperCase() + dir.slice(1)
                            }`
                          ]
                        }
                      ></div>
                    </Card>
                    <div className={styles.btnContainer}>
                      <div className={styles.btnName}>{t("move_shape")}</div>
                    </div>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Col>

        <Col span={24} style={{ marginTop: 16 }}>
          <Row gutter={16} justify="center">
            <Col span={4}></Col>
            {shapes.slice(0, 3).map((shape, index) => (
              <Col key={index} span={4}>
                <Card
                  onClick={() => shuffleShapes(index)}
                  className={styles.cardShape}
                >
                  <div className={getShapeClass(shape)}></div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col span={24} style={{ marginTop: 16 }}>
          <Row gutter={16} justify="center">
            {shapes.slice(3).map((shape, index) => (
              <Col key={index} span={4}>
                <Card
                  onClick={() => shuffleShapes(index + 3)}
                  className={styles.cardShape}
                >
                  <div className={getShapeClass(shape)}></div>
                </Card>
              </Col>
            ))}
            <Col span={4}></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LayoutStylePage;
