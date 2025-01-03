import React, { useEffect, useState } from 'react';
import { getYearsByModel } from '../services/fipeApi';
import { VehicleYear } from '../types';

interface YearSelectorProps {
  vehicleType: string;
  brandId: string;
  modelId: string;
  year: string;
  setYear: (year: string) => void;
  reference: string;
}

const YearSelector: React.FC<YearSelectorProps> = ({ vehicleType, brandId, modelId, year, setYear, reference }) => {
  const [years, setYears] = useState<VehicleYear[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYears = async () => {
      if (vehicleType && brandId && modelId) {
        setLoading(true);
        setError(null);
        try {
          const data = await getYearsByModel(vehicleType, brandId, modelId, reference);
          setYears(data);
        } catch (err) {
          setError('Erro ao carregar anos.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setYears([]);
      }
    };

    fetchYears();
  }, [vehicleType, brandId, modelId, reference]);

  return (
    <div className="mb-4">
      <label htmlFor="year" className="block text-sm font-medium text-gray-700">
        Ano
      </label>
      {loading ? (
        <p>Carregando anos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          disabled={!modelId || years.length === 0}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Selecione</option>
          {years.map((y) => (
            <option key={y.code} value={y.code}>
              {y.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default YearSelector;
