import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { BubbleSortService } from '../services/bubble-sort.service';
import { HeapSortService } from '../services/heap-sort.service';
import { QuickSortService } from '../services/quick-sort.service';
import { MergeSortService } from '../services/merge-sort.service';
import { SortService } from '../services/sort.service';
import { Subscription } from 'rxjs';

type SortType = 'merge-sort' | 'quick-sort' | 'heap-sort' | 'bubble-sort';
export class SortElement {
  value: number;
  height: number;
  active: boolean;
  sorted: boolean;
  background: string;

  constructor(value: number) {
    this.value = value;
    this.height = 3 * this.value;
    this.active = false;
    this.sorted = false;
    this.background = null;
  }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() elementsChange: EventEmitter<
    Array<SortElement>
  > = new EventEmitter();

  sortService: SortService;
  sortingInProgress: boolean = false;
  data: {
    elements: Array<SortElement>;
    type: SortType;
    speed: number;
    size: number;
  };

  sortingSubscription: Subscription;

  constructor(
    private bubbleSort: BubbleSortService,
    private heapSort: HeapSortService,
    private quickSort: QuickSortService,
    private mergeSort: MergeSortService
  ) {}

  ngOnInit(): void {
    this.data = {
      elements: null,
      type: 'merge-sort',
      speed: 50,
      size: 30,
    };

    this.initSortElements(this.data.size);
  }

  initSortElements(size: number) {
    this.data.elements = new Array();
    for (let i = 0; i < size; i++) {
      this.data.elements.push(
        new SortElement(40 + Math.round(Math.random() * 200))
      );
    }

    this.elementsChange.emit(this.data.elements);
  }

  onInputRangeChange(value: number, min: number, max: number) {
    const newValue = Number(((value - min) * 100) / (max - min)),
      newPosition = 10 - newValue * 0.2;
    return 'calc(' + newValue + '% + ' + newPosition + 'px';
  }

  onSelectionChange(sortType: SortType) {
    this.data.type = sortType;
  }

  onSortingArraySizeChange(value: number) {
    this.initSortElements(value);
  }

  onStopSort() {
    if (this.sortService) {
      this.sortService.stop();
    }
  }

  onSort() {
    this.sortingInProgress = true;

    switch (this.data.type) {
      case 'bubble-sort':
        this.sortService = this.bubbleSort;
        break;
      case 'heap-sort':
        this.sortService = this.heapSort;
        break;
      case 'merge-sort':
        this.sortService = this.mergeSort;
        break;
      case 'quick-sort':
        this.sortService = this.quickSort;
        break;
    }

    this.sortingSubscription = this.sortService.newElements.subscribe(
      (newElements) => {
        this.data.elements = newElements;
        this.elementsChange.emit(newElements);
      }
    );
    this.sortService
      .sort(this.data.elements, this.data.speed * 5)
      .finally(() => {
        this.sortingInProgress = false;
        this.sortingSubscription.unsubscribe();
      });
  }

  ngOnDestroy() {
    if (this.sortingSubscription) {
      this.sortingSubscription.unsubscribe();
    }
  }
}
