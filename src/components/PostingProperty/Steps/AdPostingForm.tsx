import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import StepIndicator from "./StepIndicator";
import SystemField from "components/Fields/SystemFields/SystemField";
import { observer } from "mobx-react-lite";
import { categoriesStore } from "stores/Categories.store";
import { propertyStore } from "stores/Property.store";
import { set } from "mobx";
import { AddPropertyModel } from "types/Property/AddPropertyModel";
import { PropertyService } from "services/propertyService";
import { useNavigate } from "react-router-dom";
import "./AdPostingForm.css";
import { SelectOption } from "types/Categories/SelectOption";
import { Field } from "types/Categories/Field";
import { usePopup } from "components/Common/Popup/PopupContext";

interface FieldValidation {
  [key: string]: {
    touched: boolean;
    error?: string;
  };
}

const AdPostingForm: React.FC = observer(() => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fieldValidation, setFieldValidation] = useState<FieldValidation>({});
  const navigate = useNavigate();
  const showPopup = usePopup();

  useEffect(() => {
    // Check if categories are loaded
    if (!categoriesStore.levels || categoriesStore.levels.length === 0) {
      categoriesStore.fetchCategories();
      return;
    }

    // Initialize validation state for current step fields
    const currentFields = JSON.parse(
      JSON.stringify(categoriesStore.levels[currentStep]?.fields || [])
    ) as Field[];
    const newValidation: FieldValidation = {};
    currentFields.forEach((field: Field) => {
      if (!fieldValidation[field.name]) {
        newValidation[field.name] = {
          touched: false,
          error: undefined,
        };
      }
    });
    setFieldValidation((prev) => ({ ...prev, ...newValidation }));
  }, [currentStep, categoriesStore.levels]);

  // Add loading state
  if (!categoriesStore.levels || categoriesStore.levels.length === 0) {
    return <div>Loading categories...</div>;
  }

  const validateField = (fieldName: string, value: any): string | undefined => {
    const currentFields = JSON.parse(
      JSON.stringify(categoriesStore.levels[currentStep]?.fields || [])
    ) as Field[];
    const field = currentFields.find((f: Field) => f.name === fieldName);

    if (!field) {
      return undefined;
    }

    if (field.required) {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return "שדה חובה";
      }
    }
    return undefined;
  };

  const handleChange = (fieldName: string) => (value: any) => {
    if (propertyStore.propertyToAdd) {
      set(propertyStore.propertyToAdd, fieldName, value);
      setFieldValidation((prev) => ({
        ...prev,
        [fieldName]: {
          touched: true,
          error: validateField(fieldName, value),
        },
      }));
    }
  };

  const validateStep = (): boolean => {
    const currentFields = JSON.parse(
      JSON.stringify(categoriesStore.levels[currentStep]?.fields || [])
    ) as Field[];
    let isValid = true;
    const newValidation = { ...fieldValidation };

    currentFields.forEach((field: Field) => {
      if (field.required) {
        const value =
          propertyStore.propertyToAdd[field.name as keyof AddPropertyModel];
        const error = validateField(field.name, value);
        if (error) {
          isValid = false;
          newValidation[field.name] = {
            touched: true,
            error,
          };
        }
      }
    });

    setFieldValidation(newValidation);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < categoriesStore.levels.length) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/select-category");
    }
  };

  const handleSearch = async (query: string): Promise<SelectOption[]> => {
    if (!query) return [];
    await new Promise((resolve) => setTimeout(resolve, 300));
    const propertyService = new PropertyService();
    const response = await propertyService.getAddressDetails(query);
    return (
      response?.map((item) => ({
        label: item.addressDetail,
        value: item.addressVal,
      })) ?? []
    );
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      const propertyService = new PropertyService();
      propertyStore.propertyToAdd.categoryType = categoriesStore.categoryNumberSelected;
      const reponse = await propertyService.addProperty(propertyStore.propertyToAdd);
      if (reponse) {
        showPopup({
          type: 'success',
          message: 'המודעה נשלחה בהצלחה',
          actionHandler: () => navigate("/"),
        });
      } else {
        showPopup({
          type: 'error',
          message: 'המודעה לא נשלחה',
        });
      }
    }
  };

  const renderStepContent = () => {
    const fields = categoriesStore?.levels[currentStep]?.fields || [];
    const rows = [];

    for (let i = 0; i < fields.length; i += 2) {
      const field1 = fields[i];
      const field2 = fields[i + 1];

      rows.push(
        <Row key={i} className="mb-3">
          <Col md={6}>
            <SystemField
              fieldType={field1.fieldType}
              label={field1.label}
              name={field1.name}
              value={
                propertyStore.propertyToAdd[
                  field1.name as keyof AddPropertyModel
                ] || ""
              }
              onSearch={handleSearch}
              onChange={handleChange(field1.name)}
              options={field1.options}
              placeHolder={field1.placeHolder}
              required={field1.required}
              error={fieldValidation[field1.name]?.error}
              touched={fieldValidation[field1.name]?.touched}
            />
          </Col>
          {field2 && (
            <Col md={6}>
              <SystemField
                fieldType={field2.fieldType}
                label={field2.label}
                name={field2.name}
                value={
                  propertyStore.propertyToAdd[
                    field2.name as keyof AddPropertyModel
                  ] || ""
                }
                onSearch={handleSearch}
                onChange={handleChange(field2.name)}
                options={field2.options}
                placeHolder={field2.placeHolder}
                required={field2.required}
                error={fieldValidation[field2.name]?.error}
                touched={fieldValidation[field2.name]?.touched}
              />
            </Col>
          )}
        </Row>
      );
    }

    return rows;
  };

  return (
    <Container className="py-5" style={{ direction: "rtl" }}>
      <h1 className="text-center mb-4">פרסום מודעה חדשה</h1>
      <StepIndicator
        totalSteps={categoriesStore.levels.length}
        currentStep={currentStep}
        stepTitles={categoriesStore.levels.map((step) => step.levelTitle)}
      />
      <Card className="mt-4 steps-form-container">
        <Card.Body>
          <form>
            {renderStepContent()}
            <div className="mt-4">
              {currentStep === categoriesStore.levels.length - 1 ? (
                <Button
                  variant="success"
                  onClick={handleSubmit}
                  className="w-100 mb-3 btn-success"
                >
                  שלח
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={handleNext}
                  className="w-100 mb-3 btn-success"
                >
                  הבא
                </Button>
              )}

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={handleBack}
                  className="text-decoration-none"
                >
                  {currentStep === 0 ? (
                    <>
                      <span className="ms-2">→</span>
                      חזור לבחירת קטגוריה
                    </>
                  ) : (
                    <>
                      <span className="ms-2">→</span>
                      חזור
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default AdPostingForm;
