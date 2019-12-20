import { ModuleWithProviders, NgModule } from "@angular/core";
import { END_POINT } from "./endpoint";
import { FilePickerDirective } from "./file-picker.directive";
import { FileUploaderService } from "./file-uploader.service";

@NgModule({
  declarations: [FilePickerDirective],
  imports: [],
  exports: [FilePickerDirective],
  providers: [FileUploaderService]
})
export class FileUploaderModule {
  static forRoot({ endPoint }): ModuleWithProviders {
    return {
      ngModule: FileUploaderModule,
      providers: [{ provide: END_POINT, useValue: endPoint }]
    };
  }
}
