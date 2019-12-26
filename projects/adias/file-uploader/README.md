# adias-file-uploader

[![npm version](https://badge.fury.io/js/adias-file-uploader.svg)](https://badge.fury.io/js/adias-file-uploader)

---

File Uploader for Angular

- [x] Currently Support single file upload

---

see Demo [here](https://adias-file-uploader.stackblitz.io)

### Example:

> app.module.ts

```ts
import { FileUploaderModule } from "adias-file-uploader";

FileUploaderModule.forRoot({
  endPoint: "https://api.example.com/api/upload"
});
```

OR

```ts
FileUploaderModule.forRoot({
  endPoint: "/upload"
});
```

> app.component.html

```HTML
<div ngxFilePicker (uploadSuccess)="onUploadSuccess($event)"></div>
```

OR

```HTML

Custom file url can be also used

<div ngxFilePicker [fileUrl]="uploadedFileUrl" (uploadSuccess)="onUploadSuccess($event)"></div>
```

## Events

- **uploadSuccess** _(Output)_:

\_function launched after picture successfully uploaded.

The value returned in `$event`.

> app.component.ts

```ts
 onUploadSuccess(e:  FilePickerRespnse) {
  console.log("fileUrl ===", e.fileUrl);
  console.log("fileName ===", e.fileName);
  console.log("fileSize ===", e.fileSize);
 }
```
