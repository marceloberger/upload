import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private API_BASE_URL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public uploadFile(file: File, id:string): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('files', file, file.name);
    formData.append('id', id);

    const options = {
      reportProgress: true
    };

    const req = new HttpRequest(
      'POST',
      `${this.API_BASE_URL}/api/file`,
      formData,
      options
    );
    return this.httpClient.request(req);
  }
}
