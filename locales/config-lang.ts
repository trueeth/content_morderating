'use client';

import merge from 'lodash/merge';
import {
  enUS as enUSAdapter,
  arSA as arSAAdapter,
} from 'date-fns/locale';

// date-pickers
import {
  enUS as enUSDate,
  zhCN as zhCNDate,
} from '@mui/x-date-pickers/locales';
// core
import {
  enUS as enUSCore,
  arSA as arSACore,
} from '@mui/material/locale';
// data-grid
import {
  enUS as enUSDataGrid,
  arSD as arSDDataGrid,
} from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

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

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
