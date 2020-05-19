import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';



export interface AppState {
  uploads: reducers.UploadState

}

export const appReducers: ActionReducerMap<AppState> = {
  uploads: reducers.UploadReducer,

}
