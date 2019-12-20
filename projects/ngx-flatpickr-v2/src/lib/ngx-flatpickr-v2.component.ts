// tslint:disable

import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import flatpickrImport from "flatpickr";
import locale from "flatpickr/dist/l10n";
import { Instance } from "flatpickr/dist/types/instance";
import { CustomLocale } from "flatpickr/dist/types/locale";
import { Options } from "flatpickr/dist/types/options";
import * as _moment from "moment";

const moment = _moment;
export const NGX_FLATPICKR_ACCESSOR: any = [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxFlatpickrV2Component),
    multi: true
  },

  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NgxFlatpickrV2Component),
    multi: true
  }
];

@Component({
  selector: "ngx-flatpickr",
  template: `
    <input
      #container
      [class]="class"
      [placeholder]="placeholder"
      (blur)="setTouched()"
    />
  `,

  providers: NGX_FLATPICKR_ACCESSOR
})
export class NgxFlatpickrV2Component
  implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @ViewChild("container", { static: true }) private el: ElementRef;
  private instance: Instance;

  @Input() private options: Options;
  @Input() public language: string;
  @Input() public class: string;
  @Input() public placeholder: string;
  @Output() public onInit: EventEmitter<Instance>;
  @Input() private selectedDates: any[] = [];
  @Input() private enabledDates: any[] = [];
  @Input() private enableSelectedDatesOnly: boolean = false;
  @Input() public default: string = moment().format();
  @Output() public onDateSelect: EventEmitter<string>;
  @Output() public onDayCreate = new EventEmitter();
  private parseError: boolean;
  private onChange: (_: string) => void;
  private onTouched: () => void;

  constructor(private renderer: Renderer) {
    this.options = {};
    this.language = "";
    this.class = "";
    this.placeholder = "";
    this.onInit = new EventEmitter<Instance>();
    this.onDateSelect = new EventEmitter<string>();

    this.onChange = (_: string) => {};
    this.onTouched = () => {};
  }

  // <Angular hooks>
  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.instance = flatpickrImport(this.el.nativeElement, {
      ...this.options,
      enable: [
        date => {
          if (this.enableSelectedDatesOnly) {
            const d = moment(date).format("YYYY-MM-DD");
            return this.selectedDates.includes(d);
          }
          if (this.enabledDates.length > 0) {
            const d = moment(date).format("YYYY-MM-DD");
            return this.enabledDates.includes(d);
          }
          if (this.enabledDates.length === 0) {
            return true;
          }
        }
      ],
      onChange: (selectedDates: [], dateStr, instance) => {
        const date = moment(dateStr).format();
        this.onChange(date);
        this.onDateSelect.emit(date);
      },
      onDayCreate: (dObj, dStr, fp, dayElem) => {
        this.onDayCreate.emit({ dObj, dStr, fp, dayElem });
        if (this.selectedDates.length > 0) {
          this.setSelectedDays(fp, dayElem);
        }
      },
      locale: this.setLocale(this.language)
    }) as Instance;

    this.onInit.emit(this.instance);
    this.setDate(this.default);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instance != undefined && changes.hasOwnProperty("default")) {
      this.setDate(changes["default"].currentValue);
    }
    if (this.instance != undefined && changes.hasOwnProperty("selectedDates")) {
      this.initialize();
    }
  }

  ngOnDestroy(): void {
    this.instance.destroy();
  }
  // </Angular hooks>

  // <FormControl>
  writeValue(value: string): void {
    this.setDate(value);
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  // </FormControl>

  setTouched(): void {
    this.onTouched();
  }

  setLocale(language: string): CustomLocale {
    switch (language.toLowerCase()) {
      case "arabic":
      case "ar":
        return locale.ar;
      case "austria":
      case "at":
        return locale.at;
      case "belarusian":
      case "be":
        return locale.be;
      case "bulgarian":
      case "bg":
        return locale.bg;
      case "bangla":
      case "bn":
        return locale.bn;
      case "catalan":
      case "cat":
        return locale.cat;
      case "czech":
      case "cs":
        return locale.cs;
      case "welsh":
      case "cy":
        return locale.cy;
      case "danish":
      case "da":
        return locale.da;
      case "german":
      case "de":
        return locale.de;
      case "english":
      case "en":
        return locale.en;
      case "esperanto":
      case "eo":
        return locale.eo;
      case "spanish":
      case "es":
        return locale.es;
      case "estonian":
      case "et":
        return locale.et;
      case "persian":
      case "fa":
        return locale.fa;
      case "finnish":
      case "fi":
        return locale.fi;
      case "french":
      case "fr":
        return locale.fr;
      case "greek":
      case "gr":
        return locale.gr;
      case "hebrew":
      case "he":
        return locale.he;
      case "hindi":
      case "hi":
        return locale.hi;
      case "croatian":
      case "hr":
        return locale.hr;
      case "hungarian":
      case "hu":
        return locale.hu;
      case "indonesian":
      case "id":
        return locale.id;
      case "italian":
      case "it":
        return locale.it;
      case "japanese":
      case "ja":
        return locale.ja;
      case "korean":
      case "ko":
        return locale.ko;
      case "kazakh":
      case "kz":
        return locale.kz;
      case "lithuanian":
      case "lt":
        return locale.lt;
      case "latvian":
      case "lv":
        return locale.lv;
      case "macedonian":
      case "mk":
        return locale.mk;
      case "mongolian":
      case "mn":
        return locale.mn;
      case "malaysian":
      case "ms":
        return locale.ms;
      case "burmese":
      case "my":
        return locale.my;
      case "dutch":
      case "nl":
        return locale.nl;
      case "norwegian":
      case "no":
        return locale.no;
      case "punjabi":
      case "pa":
        return locale.pa;
      case "polish":
      case "pl":
        return locale.pl;
      case "portuguese":
      case "pt":
        return locale.pt;
      case "romanian":
      case "ro":
        return locale.ro;
      case "russian":
      case "ru":
        return locale.ru;
      case "sinhala":
      case "si":
        return locale.si;
      case "slovak":
      case "sk":
        return locale.sk;
      case "slovenian":
      case "sl":
        return locale.sl;
      case "albanian":
      case "sq":
        return locale.sq;
      case "serbian":
      case "sr":
        return locale.sr;
      case "swedish":
      case "sv":
        return locale.sv;
      case "thai":
      case "th":
        return locale.th;
      case "turkish":
      case "tr":
        return locale.tr;
      case "ukrainian":
      case "uk":
        return locale.uk;
      case "vietnamese":
      case "vn":
        return locale.vn;
      case "mandarin":
      case "zh":
        return locale.zh;
      default:
        return locale.default;
    }
  }

  setDate(newdate: string): void {
    this.instance.setDate(newdate, true);
    this.onChange(newdate);
  }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setElementProperty(
      this.el.nativeElement,
      "disabled",
      isDisabled
    );
  }

  public validate(c: FormControl) {
    return !this.parseError
      ? null
      : {
          jsonParseError: {
            valid: false
          }
        };
  }

  setSelectedDays(fp, dayElem) {
    const filtered = this.selectedDates.filter(value => {
      return moment(dayElem.dateObj).isSame(moment(value), "dates");
    });
    if (filtered.length > 0) {
      dayElem.classList.add("success");
    }
  }
}
