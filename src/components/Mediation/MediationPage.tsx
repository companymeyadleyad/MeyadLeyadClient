import React from 'react';
import { faHandshake, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import SystemSelection, { SystemOption } from "components/Common/SystemSelection/SystemSelection";
import { useNavigate } from "react-router-dom";
import { propertyStore } from "stores/Property.store";
import { categoriesStore } from "stores/Categories.store";
const MediationPage: React.FC = () => {
  const navigate = useNavigate();

  const brokerOptions: SystemOption[] = [
    {
      id: 'broker',
      name: 'תיווך',
      icon: faHandshake
    },
    {
      id: 'no-broker',
      name: 'ללא תיווך',
      icon: faUserCheck
    }
  ];

  const handleOptionSelect = (optionId: number | string) => {
    const isBroker = optionId === 'broker';
    propertyStore.setPropertyToAdd({
      ...propertyStore.propertyToAdd,
      isMediation: isBroker
    });
    navigate("/post-ad", { state: { categoryNumber: categoriesStore.categoryNumberSelected  } });
  };

  return (
    <SystemSelection
      options={brokerOptions}
      onOptionSelect={handleOptionSelect}
      title="אנא בחר"
    />
  );
};

export default MediationPage; 