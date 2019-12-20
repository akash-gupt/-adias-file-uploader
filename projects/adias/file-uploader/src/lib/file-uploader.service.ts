import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest
} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { END_POINT } from "./endpoint";

@Injectable()
export class FileUploaderService {
  constructor(
    @Inject(END_POINT) public endPoint: string,
    private http: HttpClient
  ) {}

  upload(fileItem: File) {
    let formData = new FormData();
    formData.append("file", fileItem, fileItem.name);

    const req = new HttpRequest("POST", this.endPoint, formData, {
      reportProgress: true
    });
    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          return res.body;
        } else if (res.type === HttpEventType.UploadProgress) {
          // Compute and show the % done:
          const UploadProgress = +Math.round((100 * res.loaded) / res.total);
          return UploadProgress;
        }
      })
    );
  }
}
