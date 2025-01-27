import axios from 'axios';
import { Reference, VehicleBrand, VehicleModel, VehicleYear, VehicleDetail } from '../types';
import dotenv from 'dotenv'; 

dotenv.config();

const API_BASE_URL = 'https://fipe.parallelum.com.br/api/v2';
const SUBSCRIPTION_TOKEN = process.env.SUBSCRIPTION_TOKEN;


const fipeApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Subscription-Token': SUBSCRIPTION_TOKEN,
    'Content-Type': 'application/json',
  },
});

export const getReferences = async (): Promise<Reference[]> => {
  const response = await fipeApi.get<Reference[]>('/references');
  return response.data;
};

export const getBrandsByType = async (vehicleType: string, reference: string): Promise<VehicleBrand[]> => {
  const response = await fipeApi.get<VehicleBrand[]>(`/${vehicleType}/brands`, {
    params: { reference },
  });
  return response.data;
};

export const getModelsByBrand = async (vehicleType: string, brandId: string, reference: string): Promise<VehicleModel[]> => {
  const response = await fipeApi.get<VehicleModel[]>(`/${vehicleType}/brands/${brandId}/models`, {
    params: { reference },
  });
  return response.data;
};

export const getYearsByModel = async (vehicleType: string, brandId: string, modelId: string, reference: string): Promise<VehicleYear[]> => {
  const response = await fipeApi.get<VehicleYear[]>(`/${vehicleType}/brands/${brandId}/models/${modelId}/years`, {
    params: { reference },
  });
  return response.data;
};

export const getFipeInfo = async (vehicleType: string, brandId: string, modelId: string, yearId: string, reference: string): Promise<VehicleDetail> => {
  const response = await fipeApi.get<VehicleDetail>(`/${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearId}`, {
    params: { reference },
  });
  return response.data;
};

export default fipeApi;
