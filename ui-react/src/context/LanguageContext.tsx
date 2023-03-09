import { createContext, useCallback, useEffect, useState } from 'react';

export type AppLanguage = 'en' | 'pl';

export const Languages = ['en', 'pl'];

interface LanguageContextValue {
  language: AppLanguage;
  changeLanguage: (lng: AppLanguage) => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  changeLanguage: () => {},
});

export const LanguageContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [language, setLanguage] = useState<AppLanguage>('en');

  useEffect(() => {
    const savedInLocal = localStorage.getItem('i18nextLng');
    setLanguage(savedInLocal ? (savedInLocal as AppLanguage) : 'en');
  }, []);

  const changeLanguage = useCallback((lng: AppLanguage) => {
    setLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language: language, changeLanguage: changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
