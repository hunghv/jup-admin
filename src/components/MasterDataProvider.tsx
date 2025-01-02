import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

interface MasterDataContextType {
  masterData: any;
}

interface MyComponentProps {
  children?: React.ReactNode;
}

const MasterDataContext = createContext<MasterDataContextType | undefined>(
  undefined
);

export const MasterDataProvider: React.FC<MyComponentProps> = ({
  children,
}) => {
  const [masterData, setMasterData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMasterData = async () => {
      const storedData = localStorage.getItem('masterData');
      if (storedData) {
        setMasterData(JSON.parse(storedData));
      } else {
        try {
          const response = await apiClient.get(`/api/v1/master-data/All`);
          if (response.status === 401) {
            navigate('/sign-in');
          }
          localStorage.setItem(
            'masterData',
            JSON.stringify(response.data.data)
          );
          setMasterData(response.data.data);
        } catch (error) {
          console.error('Error fetching master data:', error);
        }
      }
    };

    loadMasterData();
  }, [navigate]);

  return (
    <MasterDataContext.Provider value={{ masterData }}>
      {children}
    </MasterDataContext.Provider>
  );
};

export const useMasterData = () => {
  const context = useContext(MasterDataContext);
  if (!context) {
    throw new Error('useMasterData must be used within a MasterDataProvider');
  }
  return context.masterData;
};
