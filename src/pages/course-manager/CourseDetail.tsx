import React from 'react';
import { useParams } from 'react-router-dom';

const CourceDetail = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default CourceDetail;
