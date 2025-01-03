import React, { useEffect, useState } from 'react';
import { getBrandsByType } from '../services/fipeApi';
import { VehicleBrand } from '../types';

interface BrandSelectorProps {
  vehicleType: string;
  brand: string;
  setBrand: (brand: string) => void;
  reference: string;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({ vehicleType, brand, setBrand, reference }) => {
  const [brands, setBrands] = useState<VehicleBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      if (vehicleType) {
        setLoading(true);
        setError(null);
        try {
          const data = await getBrandsByType(vehicleType, reference);
          setBrands(data);
        } catch (err) {
          setError('Erro ao carregar marcas.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setBrands([]);
      }
    };

    fetchBrands();
  }, [vehicleType, reference]);

  return (
    <div className="mb-4">
      <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
        Marca
      </label>
      {loading ? (
        <p>Carregando marcas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          disabled={!vehicleType || brands.length === 0}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Selecione</option>
          {brands.map((b) => (
            <option key={b.code} value={b.code}>
              {b.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default BrandSelector;
