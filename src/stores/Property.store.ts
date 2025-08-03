import { makeAutoObservable, observable } from "mobx";
import { AddPropertyModel } from "types/Property/AddPropertyModel";

export class PropertyStore {
  propertyToAdd: AddPropertyModel = observable(this.getDefaultProperty()); // ✅ Make it observable

  constructor() {
    makeAutoObservable(this);
  }

  setPropertyToAdd(propertyToAdd: AddPropertyModel) {
    this.propertyToAdd = observable(propertyToAdd); // ✅ Ensure it's reactive
  }
  private getDefaultProperty(): AddPropertyModel {
    return {
      categoryType: 0,
      addressCityStreet: "",
      houseNumber: undefined, // Optional field
      numberOfRoomsId: 1, // Default to 1 room
      isPrivateHouse: false,
      porchCount: 0,
      isThereSukaPorch: false,
      isThereParcking: false,
      isThereWarehouse: false,
      isThereOptions: false,
      isThereLandscape: false,
      propertySizeInMeters: 0,
      floor: 0,
      isTherElevator: false,
      price: undefined, // Optional
      isThereSafeRoom: false,
      isFurnished: false,
      isMediation: false,
      propertyTax: undefined, // Optional
      houseCommittee: undefined, // Optional
      propertyTypeId: undefined, // Optional
      isThereAirCondition: undefined, // Optional
      propertyConditionId: undefined, // Optional
      fullName: "",
      phoneNumbers: ""
    } as AddPropertyModel;
  };
}

export const propertyStore = new PropertyStore();