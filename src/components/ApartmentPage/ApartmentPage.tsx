import React, { useEffect, useState } from 'react';
import ApartmentList from './ApartmentList'; 
import { useParams } from 'react-router-dom';

interface Apartment {
  apartment_id: number;
  floor: number;
  rooms: number;
  price: number;
  size_m2: number;
  balcony: boolean;
  parking: boolean;
  furnished: boolean;
  for_shabbat: boolean;
  street: string;
}

interface ApartmentPageProps {
  neighborhood: string;
}

interface Data {
  neighborhood: string;
  apartments: Apartment[];
}

const ApartmentPage: React.FC = () => {
  const { neighborhood } = useParams<{ neighborhood: string }>(); // קבלת שם השכונה מה-Route
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/Data/${neighborhood}.json`);
        if (!response.ok) {
          throw new Error('Data not found');
        }
        const jsonData: Data = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading JSON data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [neighborhood]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Data not found.</div>;
  }

  return (
    <div>
      <h1>דירות בשכונת {data.neighborhood}</h1>
      <ApartmentList apartments={data.apartments} />
    </div>
  );
};

export default ApartmentPage;
