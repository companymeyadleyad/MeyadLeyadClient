import React, { useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  TextField,
  NumberField,
  SelectField,
  CheckboxField,
  RadioGroupField,
  TextareaField,
  PriceField,
  PhoneField,
  AutocompleteField,
  ListGroupField,
} from "../Fields/FormFields";
import { autocompleteService } from "services/autocompleteService";

const FieldsShowcase: React.FC = () => {
  const [formValues, setFormValues] = useState({
    text: "",
    number: "",
    select: "",
    checkbox: false,
    radio: "",
    textarea: "",
    price: "",
    phone: "",
    street: "",
    neighborhood: "",
    lastName: "",
    listGroup: "",
  });

  const handleChange = (field: string) => (value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const handleListGroupItemClick = (value: string | number) => {
    console.log("ListGroup item clicked:", value);
    // You can add additional logic here
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Fields Showcase</h1>
      <Row>
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Text Field</h5>
              <TextField
                label="Text Input"
                name="text"
                value={formValues.text}
                onChange={handleChange("text")}
                placeholder="Enter text"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Number Field</h5>
              <NumberField
                label="Number Input"
                name="number"
                value={formValues.number}
                onChange={handleChange("number")}
                placeholder="Enter number"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Select Field</h5>
              <SelectField
                label="Select Option"
                name="select"
                value={formValues.select}
                onChange={handleChange("select")}
                options={selectOptions}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Checkbox Field</h5>
              <CheckboxField
                label="Check me"
                name="checkbox"
                value={formValues.checkbox}
                onChange={handleChange("checkbox")}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Radio Group Field</h5>
              <RadioGroupField
                label="Select Option"
                name="radio"
                value={formValues.radio}
                onChange={handleChange("radio")}
                options={selectOptions}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Textarea Field</h5>
              <TextareaField
                label="Text Area"
                name="textarea"
                value={formValues.textarea}
                onChange={handleChange("textarea")}
                placeholder="Enter long text"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Price Field</h5>
              <PriceField
                label="Price"
                name="price"
                value={formValues.price}
                onChange={handleChange("price")}
                placeholder="Enter price"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Phone Field</h5>
              <PhoneField
                label="Phone Number"
                name="phone"
                value={formValues.phone}
                onChange={handleChange("phone")}
                placeholder="Enter phone number"
              />
            </Card.Body>
          </Card>
        </Col>

        {/* <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Street Autocomplete</h5>
              <AutocompleteField
                label="Street"
                name="street"
                value={formValues.street}
                onChange={handleChange("street")}
                placeholder="Enter street name"
                onSearch={autocompleteService.searchStreets}
                minChars={3}
                debounceMs={300}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Neighborhood Autocomplete</h5>
              <AutocompleteField
                label="Neighborhood"
                name="neighborhood"
                value={formValues.neighborhood}
                onChange={handleChange("neighborhood")}
                placeholder="Enter neighborhood name"
                onSearch={autocompleteService.searchNeighborhoods}
                minChars={3}
                debounceMs={300}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">Last Name Autocomplete</h5>
              <AutocompleteField
                label="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange("lastName")}
                placeholder="Enter last name"
                onSearch={autocompleteService.searchLastNames}
                minChars={3}
                debounceMs={300}
              />
            </Card.Body>
          </Card>
        </Col> */}

        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="card-title">List Group Field</h5>
              <ListGroupField
                label="Select an option"
                name="listGroup"
                value={formValues.listGroup}
                onChange={handleChange("listGroup")}
                items={selectOptions}
                onItemClick={handleListGroupItemClick}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Current Form Values</Card.Title>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FieldsShowcase;
