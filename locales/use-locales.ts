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
  // Direction by lang
  onChangeDirectionByLang: (lang: string) => void;
}

export const SettingsContext = createContext({} as SettingsContextProps);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};

// ----------------------------------------------------------------------

export function useTranslate() {
  const { t, i18n, ready } = useTranslation();

  const settings = useSettingsContext();

  const onChangeLang = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang);
      // settings.onChangeDirectionByLang(newlang);
    },
    [i18n, settings]
  );

  return {
    t,
    i18n,
    ready,
    onChangeLang,
  };
}