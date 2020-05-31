import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { SortElement } from '../menu/menu.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('section') section: ElementRef;
  @Input() elements: Array<SortElement>;

  private sectionWidth: number;
  public elementWidth: string;
  public elementFontSize: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.sectionWidth = 200;
  }

  ngAfterViewInit(): void {
    this.sectionWidth = this.section.nativeElement.offsetWidth;

    this.elementWidth = `${this.sectionWidth / 2 / this.elements.length}px`;
    this.elementFontSize = `${this.sectionWidth / 4 / this.elements.length}px`;

    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.elementWidth = `${
      this.sectionWidth / 2 / changes.elements.currentValue.length
    }px`;
    this.elementFontSize = `${
      this.sectionWidth / 4 / changes.elements.currentValue.length
    }px`;
  }
}
