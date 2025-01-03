import React from 'react';

interface VehicleTypeSelectorProps {
  vehicleType: string;
  setVehicleType: (type: string) => void;
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({ vehicleType, setVehicleType }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicleType(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
        Tipo de Veículo
      </label>
      <select
        id="vehicleType"
        value={vehicleType}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Selecione</option>
        <option value="cars">Carros</option>
        <option value="motorcycles">Motos</option>
        <option value="trucks">Caminhões</option>
      </select>
    </div>
  );
};

export default VehicleTypeSelector;
