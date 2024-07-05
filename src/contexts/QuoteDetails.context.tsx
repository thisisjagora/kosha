"use client";
import useBookMoveStore from '@/stores/book-move.store';
import { Quote } from '@/types/structs';
import React, { createContext, useState, useContext, FC, PropsWithChildren, SetStateAction, useEffect } from 'react';

interface DataContextType {
  quoteDetailsData: Quote;
  setQuoteDetailsData: React.Dispatch<SetStateAction<any>>; 
}

const initialData: DataContextType = {
  quoteDetailsData: {
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
  },
  setQuoteDetailsData: () => {},
};

const QuoteDetailsContext = createContext<DataContextType>(initialData);

export const QuoteDetailsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { formData } = useBookMoveStore((state) => state)
  const [quoteDetailsData, setQuoteDetailsData] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('quoteDetailsData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });

  useEffect(() => {
    if (quoteDetailsData !== null) {
      localStorage.setItem('quoteDetailsData', JSON.stringify(quoteDetailsData));
    } else {
      localStorage.removeItem('quoteDetailsData');
    }
  }, [quoteDetailsData]);

  useEffect(() => {    
    if(formData.time === "") {
      setQuoteDetailsData(null);
    }
  }, [formData.time]);

  return (
    <QuoteDetailsContext.Provider value={{ quoteDetailsData, setQuoteDetailsData }}>
      {children}
    </QuoteDetailsContext.Provider>
  );
};

export const useQuoteDetailsData = () => useContext(QuoteDetailsContext);
