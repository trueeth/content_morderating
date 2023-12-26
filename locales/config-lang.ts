'use client';

import merge from 'lodash/merge';
import {
  enUS as enUSAdapter,
  arSA as arSAAdapter,
} from 'date-fns/locale';
import {
  enUS as enUSDate
} from '@mui/x-date-pickers/locales';
import {
  enUS as enUSCore,
  arSA as arSACore,
} from '@mui/material/locale';
import {
  enUS as enUSDataGrid,
  arSD as arSDDataGrid,
} from '@mui/x-data-grid';
export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'Arabic',
    value: 'ar',
    systemValue: merge(arSDDataGrid, arSACore),
    adapterLocale: arSAAdapter,
    icon: 'flagpack:sa',
  },
];

export const defaultLang = allLangs[0]; // English
