
import { createAction, props } from '@ngrx/store';




export const AddUploadAction = createAction(
  '[Curso] Cargar File',
  props<{
      id: string,
      file:File
  }>()
);

export const RemoveUploadAction = createAction(
  '[Curso] Remover File',
  props<{ id:string }>()
);

export const UpdateProgressAction = createAction(
  '[Curso] Atualizar Progress',
  props<{
      id:string,
      progress:number

   }>()
);

export const SetUploadErrorAction = createAction(
  '[Curso] Adcionar Erro',
  props<{
      id:string,
     error:any

   }>()
);

export const CancelUploadAction = createAction(
  '[Curso] Cancel File',
  props<{ id:string }>()
);



export const StartUploadAction = createAction(
  '[Curso] start File',
  props<{ id:string }>()
);

export const CompleteUploadAction = createAction(
  '[Curso] complete File',
  props<{ id:string }>()
);
