'use client';

import { createContext, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next';



import { allLangs, defaultLang } from './config-lang';
import { localStorageGetItem } from '@utils/storage-available'

// ----------------------------------------------------------------------

export function useLocales() {
  const langStorage = localStorageGetItem('i18nextLng');

  const currentLang = allLangs.find((lang) => lang.value === langStorage) || defaultLang;

  return {
    allLangs,
    currentLang,
  };
}


export type SettingsContextProps ={
  onChangeDirectionByLang: (lang: string) => void;
}

export const SettingsContext = createContext({} as SettingsContextProps);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};


export function useTranslate() {
  const { t, i18n, ready } = useTranslation();

  const settings = useSettingsContext();

  /*eslint-disable*/
  const onChangeLang = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang);
      document.dir=i18n.dir(newlang)
    },
    [i18n, settings]
  );
  /*eslint-enable*/

  return {
    t,
    i18n,
    ready,
    onChangeLang,
  };
}
