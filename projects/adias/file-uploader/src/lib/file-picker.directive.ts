import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2
} from "@angular/core";
import { FilePickerRespnse } from "./file-picker.response";
import { FileUploaderService } from "./file-uploader.service";

@Directive({
  selector: "[ngxFilePicker]"
})
export class FilePickerDirective implements OnInit {
  @Output() uploadSuccess = new EventEmitter<FilePickerRespnse>();
  element: HTMLElement;
  hoverdDiv: HTMLElement;
  input: HTMLElement;
  button: HTMLElement;
  image: HTMLElement;
  uploadedFiles: Array<File>;
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private uploaderService: FileUploaderService
  ) {}

  ngOnInit() {
    this.element = this.elRef.nativeElement;
    this.element.style.position = "relative";
    this.createUploaderElement();
    this.createUploadButton();
    this.createHoveredDiv();
  }

  createHoveredDiv() {
    this.hoverdDiv = this.renderer.createElement("div");
    this.renderer.setStyle(
      this.hoverdDiv,
      "background-color",
      "rgba(0,0,0,0.4)"
    );
    this.renderer.setStyle(this.hoverdDiv, "top", "0");
    this.renderer.setStyle(this.hoverdDiv, "left", "0");
    this.renderer.setStyle(this.hoverdDiv, "height", "100%");
    this.renderer.setStyle(this.hoverdDiv, "width", "100%");
    this.renderer.setStyle(this.hoverdDiv, "position", "absolute");
    this.renderer.setStyle(this.hoverdDiv, "overflow", "auto");
    this.renderer.setStyle(this.hoverdDiv, "display", "none");
    this.renderer.setStyle(this.hoverdDiv, "z-index", "8");
    this.renderer.appendChild(this.element, this.hoverdDiv);
  }

  createUploadButton() {
    this.button = this.renderer.createElement("button");
    this.renderer.setStyle(this.button, "background-color", "#337ab7");
    this.renderer.setStyle(this.button, "border-color", "#2e6da4");
    this.renderer.setStyle(this.button, "color", "#ffff");
    this.renderer.setStyle(this.button, "position", "absolute");
    this.renderer.setStyle(this.button, "top", "0");
    this.renderer.setStyle(this.button, "right", "0");
    this.renderer.setStyle(this.button, "bottom", "0");
    this.renderer.setStyle(this.button, "left", "0");
    this.renderer.setStyle(this.button, "margin", "auto");
    this.renderer.setStyle(this.button, "height", "50px");
    this.renderer.setStyle(this.button, "z-index", "9");
    this.renderer.setStyle(this.button, "width", "120px");
    this.renderer.setStyle(this.button, "font-weight", "600");
    this.renderer.setStyle(this.button, "font-size", "16px");
    this.renderer.setStyle(this.button, "display", "none");
    const buttontext = this.renderer.createText("Select File");
    this.renderer.appendChild(this.button, buttontext);
    this.renderer.appendChild(this.element, this.button);
    this.button.addEventListener("click", () => {
      this.input.click();
    });
  }

  createUploaderElement() {
    this.input = this.renderer.createElement("input");
    this.renderer.setProperty(this.input, "type", "file");
    this.renderer.setStyle(this.input, "opacity", "0");
    this.renderer.setStyle(this.input, "height", "100%");
    this.renderer.setStyle(this.input, "width", "100%");
    this.renderer.appendChild(this.element, this.input);
    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener("change", ev => {
      const file = (ev as any).target.files[0];
      this.upload(file);
    });
  }

  upload(file: File) {
    this.uploaderService.upload(file).subscribe({
      next: (result: FilePickerRespnse) => {
        if (result && typeof result === "object") {
          this.uploadSuccess.emit(result);
          this.previewImage(result.fileUrl);
        }
      }
    });
  }

  previewImage(fileUrl: string) {
    this.renderer.setStyle(this.element, "background-image", `url(${fileUrl})`);
    this.renderer.setStyle(this.element, "background-size", `cover`);
  }

  @HostListener("mouseover") onMouseOver() {
    console.log("mouseover");
    this.addHoverEffect();
    this.showButton();
  }

  @HostListener("mouseout") onMouseOut() {
    this.removeHoverEffect();
    this.hideButton();
  }

  private addHoverEffect() {
    this.renderer.setStyle(this.hoverdDiv, "display", "block");
  }

  private removeHoverEffect() {
    this.renderer.setStyle(this.hoverdDiv, "display", "none");
  }

  private showButton() {
    this.renderer.setStyle(this.button, "display", `block`);
  }

  private hideButton() {
    this.renderer.setStyle(this.button, "display", `none`);
  }
}
// TODO hover karne p upload button ayega uslp click krne p uploa dnput khileha
