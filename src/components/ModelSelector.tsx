import React, { useEffect, useState } from 'react';
import { getModelsByBrand } from '../services/fipeApi';
import { VehicleModel } from '../types';

interface ModelSelectorProps {
  vehicleType: string;
  brandId: string;
  model: string;
  setModel: (model: string) => void;
  reference: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ vehicleType, brandId, model, setModel, reference }) => {
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      if (vehicleType && brandId) {
        setLoading(true);
        setError(null);
        try {
          const data = await getModelsByBrand(vehicleType, brandId, reference);
          setModels(data);
        } catch (err) {
          setError('Erro ao carregar modelos.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setModels([]);
      }
    };

    fetchModels();
  }, [vehicleType, brandId, reference]);

  return (
    <div className="mb-4">
      <label htmlFor="model" className="block text-sm font-medium text-gray-700">
        Modelo
      </label>
      {loading ? (
        <p>Carregando modelos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={!brandId || models.length === 0}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Selecione</option>
          {models.map((m) => (
            <option key={m.code} value={m.code}>
              {m.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ModelSelector;
