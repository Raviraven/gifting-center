import { useTranslation } from 'react-i18next';

export const TranslatedText = ({ lKey }: { lKey: string }) => {
  const { t } = useTranslation();
  return <>{t(lKey)}</>;
};
