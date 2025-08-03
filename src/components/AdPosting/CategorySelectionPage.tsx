import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { categoriesStore } from "stores/Categories.store";
import { observer } from "mobx-react-lite";
import { 
  faHome
} from "@fortawesome/free-solid-svg-icons";
import SystemSelection, { SystemOption } from "components/Common/SystemSelection/SystemSelection";

const CategorySelectionPage: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoriesStore.categoriesFetched) {
      setIsLoading(false);
    } else {
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

  const handleOptionSelect = async (optionId: number | string) => {
    try {
      await categoriesStore.fetchCategoryLevels(Number(optionId));
      if(categoriesStore.isSupportMediation) {
        navigate("/mediation");
      } else {
        navigate("/post-ad", { state: { categoryNumber: optionId } });
      }
    } catch (error) {
      console.error("Error fetching category levels:", error);
    }
  };

  // Map category numbers to icons
  const getCategoryIcon = (categoryNumber: number) => {
    const iconMap: { [key: number]: any } = {
      1: faHome,        // For rent
      2: faHome,    // For sale
      3: faHome, // Location
      4: faHome   // Information
    };
    return iconMap[categoryNumber] || faHome;
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center" style={{ direction: "rtl" }}>
        <div>טוען קטגוריות...</div>
      </Container>
    );
  }

  const systemOptions: SystemOption[] = categoriesStore.categories.map(category => ({
    id: category.categoryNumber,
    name: category.categoryName,
    icon: getCategoryIcon(category.categoryNumber)
  }));

  return (
    <SystemSelection
      options={systemOptions}
      onOptionSelect={handleOptionSelect}
      title="בחר קטגוריה"
    />
  );
});

export default CategorySelectionPage;
