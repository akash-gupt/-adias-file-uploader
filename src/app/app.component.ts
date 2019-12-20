import { Component } from "@angular/core";
import { FilePickerRespnse } from "projects/adias/file-uploader/src/public-api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  onUploadSuccess(e: FilePickerRespnse) {
    console.log("fileUrl ===", e.fileUrl);
    console.log("fileName ===", e.fileName);
    console.log("fileSize ===", e.fileSize);
  }
}
