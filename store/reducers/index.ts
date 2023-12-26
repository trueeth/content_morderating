import { combineReducers } from '@reduxjs/toolkit';
import dialogReducer, { IDialogSlice } from './dialog/reducers';
import drawerReducer, { IDrawerSlice } from './drawer/reducers';
import uploadReducers, { IUploadSlice } from './upload/reducers';
import snackbarReducers, { ISnackbarSlice } from './snackbar/reducers';
import paginationReducers, { IPaginationSlice } from '@store/reducers/page/reducers';
import apiReducers, { IApiSlice } from '@store/reducers/api/reducers';
import settingReducers, { ISettingSlice } from '@store/reducers/setting/reducers';

export interface IAppSlice {
  dialog: IDialogSlice;
  drawer: IDrawerSlice;
  upload: IUploadSlice;
  snackbar: ISnackbarSlice;
  pagination: IPaginationSlice;
  api: IApiSlice;
  setting: ISettingSlice;
}

const appReducer = combineReducers({
  dialog: dialogReducer,
  drawer: drawerReducer,
  upload: uploadReducers,
  snackbar: snackbarReducers,
  pagination: paginationReducers,
  api: apiReducers,
  setting: settingReducers,
});

export default appReducer;
