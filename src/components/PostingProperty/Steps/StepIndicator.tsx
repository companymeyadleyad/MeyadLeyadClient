import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./StepIndicator.css";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  stepTitles: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
  stepTitles,
}) => {
  return (
    <Container className="step-indicator-container">
      <Row className="step-indicator">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Col
            key={index}
            className={`step ${index <= currentStep ? "active" : ""} ${
              index === currentStep ? "current" : ""
            }`}
          >
            <div className="step-title">{stepTitles[index]}</div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StepIndicator;
