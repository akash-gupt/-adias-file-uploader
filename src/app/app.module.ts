import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FileUploaderModule } from "projects/adias/file-uploader/src/public-api";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploaderModule.forRoot({
      endPoint: "https://api.timberlinehelicharters.com/api/upload"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
