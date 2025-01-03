import React, { useEffect, useState } from 'react';
import { getFipeInfo } from '../services/fipeApi';
import { VehicleDetail as VehicleDetailType } from '../types';

interface VehicleDetailProps {
  vehicleType: string;
  brandId: string;
  modelId: string;
  yearId: string;
  reference: string;
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({ vehicleType, brandId, modelId, yearId, reference }) => {
  const [detail, setDetail] = useState<VehicleDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (vehicleType && brandId && modelId && yearId) {
        setLoading(true);
        setError(null);
        try {
          const data = await getFipeInfo(vehicleType, brandId, modelId, yearId, reference);
          setDetail(data);
        } catch (err) {
          setError('Erro ao carregar detalhes do veículo.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setDetail(null);
      }
    };

    fetchDetail();
  }, [vehicleType, brandId, modelId, yearId, reference]);

  if (loading) {
    return <p>Carregando detalhes do veículo...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!detail) {
    return null;
  }

  return (
    <div className="mt-6 p-4 border border-gray-300 rounded-md shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Detalhes do Veículo</h2>
      <p><strong>Marca:</strong> {detail.brand}</p>
      <p><strong>Modelo:</strong> {detail.model}</p>
      <p><strong>Ano:</strong> {detail.modelYear}</p>
      <p><strong>Combustível:</strong> {detail.fuel}</p>
      <p><strong>Preço:</strong> {detail.price}</p>
      
      {detail.priceHistory && detail.priceHistory.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Histórico de Preços</h3>
          <ul className="list-disc list-inside">
            {detail.priceHistory.map((history, index) => (
              <li key={index}>
                {history.month}: {history.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VehicleDetail;
