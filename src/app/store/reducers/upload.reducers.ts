import { createReducer, on } from '@ngrx/store';
import {
    AddUploadAction,
    RemoveUploadAction,
    UpdateProgressAction,
    SetUploadErrorAction,
    CancelUploadAction,
    CompleteUploadAction,
    StartUploadAction  } from '../actions';

import update from 'immutability-helper';

export enum UploadStatus {
  Ready = 'Ready',
  Requested = 'Requested',
  Started = 'Started',
  Failed = 'Failed',
  Completed = 'Completed'
}

export interface Upload {
  status: UploadStatus,
  id: string,
  name:string| null,
  progress: number | null,
  error: string | null,

}

export interface UploadState {

  uploads: Upload[];
}

export const UploadInitialState: UploadState = {
  uploads  : [],
}

const _UploadReducer = createReducer( UploadInitialState,

  on( AddUploadAction, (state, { id, file }) =>   {

      const index = findIndexUpload(state, id);

      if(index !== -1 && (state.uploads[index].status === UploadStatus.Requested || state.uploads[index].status === UploadStatus.Started)) {
          return state;
      }

      const uploads = index === -1
         ? state.uploads
         : update(state.uploads, {
             $splice: [[index,1]]

         });

      return {

          uploads: [
             ...uploads,
             {
                 id: id,
                 progress: null,
                 name: file.name,
                 error: null,
                 status: UploadStatus.Requested,
             }
          ]
      }

  }),
  on( RemoveUploadAction, (state, { id }) =>   {

      const uploads = state.uploads.filter( upload => upload.id !== id);

      if (uploads.length === state.uploads.length) {
          return state;
      }
      return {
          uploads: uploads
      }

  }),
  on( CancelUploadAction, (state, { id }) =>   {

      const uploads = state.uploads.filter( upload => upload.id !== id);

      if (uploads.length === state.uploads.length) {
          return state;
      }

      const index = findIndexUpload(state, id );

      if(index === -1 ) {
          return state;
      }
      return {

          uploads: [
             ...uploads,
             {
              ...state.uploads[index],
              progress: null,
              status: UploadStatus.Ready,
              error: null,
              name: null,

             }
          ]
      }

  }),
  on( CompleteUploadAction, (state, { id }) =>   {

      const uploads = state.uploads.filter( upload => upload.id !== id);

      if (uploads.length === state.uploads.length) {
          return state;
      }

      const index = findIndexUpload(state, id );

      if(index === -1 ) {
          return state;
      }
      return {

          uploads: [
             ...uploads,
             {
              ...state.uploads[index],
              progress: 1,
              status: UploadStatus.Completed,
              error: null,

             }
          ]
      }

  }),
  on( StartUploadAction, (state, { id }) =>   {

      const uploads = state.uploads.filter( upload => upload.id !== id);

      if (uploads.length === state.uploads.length) {
          return state;
      }

      const index = findIndexUpload(state, id );

      if(index === -1 ) {
          return state;
      }
      return {

          uploads: [
             ...uploads,
             {
              ...state.uploads[index],
              progress: 0,
              status: UploadStatus.Started,
              error: null,

             }
          ]
      }

  }),
  on( UpdateProgressAction, (state, { id, progress }) =>   {

      const uploads = state.uploads.filter( upload => upload.id !== id);

      if (uploads.length === state.uploads.length) {
          return state;
      }



      const index = findIndexUpload(state, id);

      if(index === -1 ) {
          return state;
      }

      if(state.uploads[index].progress === (progress/100)) {
          return state;
      }

      return {

          uploads: [
             ...uploads,
             {
              ...state.uploads[index],
              progress: progress/100
             }
          ]
      }

  }),

  on( SetUploadErrorAction, (state, { id, error }) =>   {

      const uploads = state.uploads.filter( upload => id !== id);

      if (uploads.length === state.uploads.length) {
          return state;
      }



      const index = findIndexUpload(state, id );

      if(index === -1 ) {
          return state;
      }

      return {

          uploads: [
             ...uploads,
             {
              ...state.uploads[index],
             error:error,
             progress:1,
             status: UploadStatus.Failed,
             }
          ]
      }

  }),

);

export function UploadReducer(state, action) {
  return _UploadReducer(state, action);
}

function findIndexUpload(state:UploadState, id:string) {

  return state.uploads.findIndex( (upload:Upload) => upload.id === id);
}



