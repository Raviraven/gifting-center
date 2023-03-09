import { useCallback, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import {
  AppLanguage,
  LanguageContext,
  Languages,
} from '../../context/LanguageContext';
import { TranslatedText } from '../translated-text/TranslatedText';

export const Layout = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const changeLang = useCallback(
    (lng: string) => {
      changeLanguage(lng as AppLanguage);
      window.location.reload();
    },
    [changeLanguage]
  );

  return (
    <section>
      <header>
        <TranslatedText lKey="chooseLanguage" />
        <select onChange={(e) => changeLang(e.target.value)} value={language}>
          {Languages.map((n) => (
            <option value={n} key={`language-option-${n}`}>
              {n}
            </option>
          ))}
        </select>
      </header>
      <main>
        <Outlet />
      </main>
    </section>
  );
};
