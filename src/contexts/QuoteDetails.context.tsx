"use client";

import { StorageKeys } from '@/constants/enums';
import { Quote } from '@/types/structs';
import React, { createContext, useState, useContext, FC, PropsWithChildren, useEffect, SetStateAction } from 'react';

interface DataContextType {
  quoteDetailsData: Quote;
  setQuoteDetailsData: React.Dispatch<SetStateAction<Quote>>;
  updateQuoteField: (field: keyof Quote, value: any) => void;
}

const initialData: Quote = {
  companyName: '',
  hourlyRate: 0,
  movers: 0,
  companyCity: '',
  companyProvince: '',
  movingTruck: '',
  equippedToMove: [],
  minimumHours: 0,
  minimumAmount: 0,
  companyEmail: '',
  companyId: '',
  additionalMoverHourlyRate: 0,
  majorAppliancesFee: 0,
  workoutEquipmentsFee: 0,
  flightOfStairsFee: 0,
  pianosFee: 0,
  truckFee: 0,
  stopOverFee: 0,
  hotTubsFee: 0,
  poolTablesFee: 0,
  averageRating: 0,
  numberOfReviews: 0,
  voucherCode: ''
};

const QuoteDetailsContext = createContext<DataContextType>({
  quoteDetailsData: initialData,
  setQuoteDetailsData: () => {},
  updateQuoteField: () => {},
});

export const QuoteDetailsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [quoteDetailsData, setQuoteDetailsData] = useState<Quote>(() => {
    const savedData = localStorage.getItem(StorageKeys.QUOTE_DETAIL);
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const updateQuoteField = (field: keyof Quote, value: any) => {
    setQuoteDetailsData((prevData) => {
      const newData = { ...prevData, [field]: value };
      localStorage.setItem(StorageKeys.QUOTE_DETAIL, JSON.stringify(newData));
      return newData;
    });
  };

  useEffect(() => {
    localStorage.setItem(StorageKeys.QUOTE_DETAIL, JSON.stringify(quoteDetailsData));
  }, [quoteDetailsData]);

  return (
    <QuoteDetailsContext.Provider value={{ quoteDetailsData, setQuoteDetailsData, updateQuoteField }}>
      {children}
    </QuoteDetailsContext.Provider>
  );
};

export const useQuoteDetailsData = () => useContext(QuoteDetailsContext);
