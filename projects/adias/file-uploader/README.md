# @adias/file-uploader

[![npm version](https://badge.fury.io/js/ngx-flatpickrjs.svg)](https://www.npmjs.com/package/ngx-flatpickrjs)

---

File Uploader for Angular

- [x] Currently Support single file upload

---

### Example:

> app.module.ts

```ts
import { FileUploaderModule } from "@adias/file-uploader";

FileUploaderModule.forRoot({
  endPoint: "https://api.timberlinehelicharters.com/api/upload"
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
