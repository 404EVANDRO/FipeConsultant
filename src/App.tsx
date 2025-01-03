import { useEffect, useState } from 'react';
import VehicleTypeSelector from './components/VehicleTypeSelector';
import BrandSelector from './components/BrandSelector';
import ModelSelector from './components/ModelSelector';
import YearSelector from './components/YearSelector';
import VehicleDetail from './components/VehicleDetail';
import { getReferences } from './services/fipeApi';
import { Reference } from './types';

function App() {
  const [reference, setReference] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [loadingReference, setLoadingReference] = useState<boolean>(true);
  const [errorReference, setErrorReference] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferences = async () => {
      setLoadingReference(true);
      setErrorReference(null);
      try {
        const data: Reference[] = await getReferences();
        // Supondo que a última referência seja a mais atual
        const sorted = data.sort((a, b) => parseInt(b.code) - parseInt(a.code));
        setReference(sorted[0].code);
      } catch (err) {
        setErrorReference('Erro ao carregar referências.');
        console.error(err);
      } finally {
        setLoadingReference(false);
      }
    };

    fetchReferences();
  }, []);

  // Resetar seleção quando vehicleType muda
  useEffect(() => {
    setBrand('');
    setModel('');
    setYear('');
  }, [vehicleType]);

  // Resetar seleção quando brand muda
  useEffect(() => {
    setModel('');
    setYear('');
  }, [brand]);

  // Resetar seleção quando model muda
  useEffect(() => {
    setYear('');
  }, [model]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Consulta FIPE</h1>
        {loadingReference ? (
          <p>Carregando referências...</p>
        ) : errorReference ? (
          <p className="text-red-500">{errorReference}</p>
        ) : (
          <>
            <VehicleTypeSelector vehicleType={vehicleType} setVehicleType={setVehicleType} />
            <BrandSelector
              vehicleType={vehicleType}
              brand={brand}
              setBrand={setBrand}
              reference={reference}
            />
            <ModelSelector
              vehicleType={vehicleType}
              brandId={brand}
              model={model}
              setModel={setModel}
              reference={reference}
            />
            <YearSelector
              vehicleType={vehicleType}
              brandId={brand}
              modelId={model}
              year={year}
              setYear={setYear}
              reference={reference}
            />
            <VehicleDetail
              vehicleType={vehicleType}
              brandId={brand}
              modelId={model}
              yearId={year}
              reference={reference}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
