import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UploadService } from 'src/app/service/upload.service';
import { of, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as uploadActions from '../actions';
import { tap, mergeMap, map, catchError, concatMap, switchMap, takeUntil, withLatestFrom, mergeAll } from 'rxjs/operators';

import { HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable()
export class UploadEffects {

  constructor(
    private actions$: Actions,
    private uploadService: UploadService
){}

cargarupload$ : Observable<Action> = createEffect(
  () => this.actions$.pipe(
      ofType( uploadActions.AddUploadAction ),
      concatMap( action =>
          of(action).pipe(
              mergeMap( (action:any) =>
              withLatestFrom(this.uploadService.uploadFile( action.file, action.id )),
              ),
              takeUntil(
                this.actions$.pipe(
                  ofType(uploadActions.CancelUploadAction) //preciso passar o id
                )
              ),
          ),


          map( [event, action] => getActionFromHttpEvent(value, index)),


      )

  )

  )

  private getActionFromHttpEvent(event: any, action:any) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return uploadActions.StartUploadAction({id:action.id});
      }
      case HttpEventType.UploadProgress: {
        return uploadActions.UpdateProgressAction({
            id:action.id,
          progress: Math.round((100 * event.loaded) / event.total)
        });
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          return uploadActions.CompleteUploadAction({id:action.curso.codigo});
        } else {
          return uploadActions.SetUploadErrorAction({
            id:action.id,
            error: event.statusText
          });
        }
      }
      default: {
        return uploadActions.SetUploadErrorAction({
            id:action.id,
          error: `Unknown Event: ${JSON.stringify(event)}`
        });
      }
    }
  }





}
