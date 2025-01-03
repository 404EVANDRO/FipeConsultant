export interface Reference {
    code: string;
    month: string;
  }
  
  export interface VehicleBrand {
    code: string;
    name: string;
  }
  
  export interface VehicleModel {
    code: string;
    name: string;
  }
  
  export interface VehicleYear {
    code: string;
    name: string;
  }
  
  export interface PriceHistory {
    month: string;
    price: string;
    reference: string;
  }
  
  export interface VehicleDetail {
    brand: string;
    codeFipe: string;
    fuel: string;
    fuelAcronym: string;
    model: string;
    modelYear: number;
    price: string;
    priceHistory: PriceHistory[];
    referenceMonth: string;
    vehicleType: number;
  }
  