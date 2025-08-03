import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { ListGroupField } from "components/Fields/FormFields";
import "./CategorySelectionPage.css";

const CategorySelectionPage: React.FC = observer(() => {
  const [selectedCategory, setSelectedCategory] = useState<
    string | number | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If categories are already loaded, we don't need to fetch them again
    if (categoriesStore.categoriesFetched) {
      setIsLoading(false);
    } else {
      // If categories are not loaded, fetch them
      loadCategories();
    }
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      await categoriesStore.fetchCategories();
    } catch (error) {
      console.error("Error loading categories:", error);
    }
    setIsLoading(false);
  };

  const handleCategorySelect = async (categoryNumber: string | number) => {
    try {
      // Convert to number if it's a string
      const categoryNumberValue =
        typeof categoryNumber === "string"
          ? parseInt(categoryNumber, 10)
          : categoryNumber;

      // Fetch the levels for the selected category
      await categoriesStore.fetchCategoryLevels(categoryNumberValue);

      // Navigate to the post ad form with the selected category
      navigate("/post-ad", { state: { categoryNumber: categoryNumberValue } });
    } catch (error) {
      console.error("Error fetching category levels:", error);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <div>טוען קטגוריות...</div>
      </Container>
    );
  }

  // Convert categories to the format expected by ListGroupField
  const categoryOptions = categoriesStore.categories.map((category) => ({
    value: category.categoryNumber,
    label: category.categoryName,
  }));

  return (
    <Container className="py-5" style={{ direction: "rtl" }}>
      <h1 className="text-center mb-4">בחר קטגוריה למודעה</h1>
      <Card className="mt-4 category-form-container">
        <Card.Body>
          <div className="width-form">
            <ListGroupField
              label=""
              name="category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              items={categoryOptions}
              onItemClick={handleCategorySelect}
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default CategorySelectionPage;
