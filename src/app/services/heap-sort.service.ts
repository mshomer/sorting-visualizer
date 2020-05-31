import { Injectable } from '@angular/core';
import { SortElement } from '../menu/menu.component';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root',
})
export class HeapSortService extends SortService {
  private _speed: number;

  constructor() {
    super();
  }

  async sort(elements: SortElement[], speed: number): Promise<void> {
    this._speed = speed;
    this._runSort = true;

    return new Promise(async (resolve, reject) => {
      try {
        await this.heapSort(elements);
      } catch {
        this.clearElementsStatuses(elements);
        reject();
        return;
      }

      resolve();
    });
  }

  async heapSort(elements: SortElement[]) {
    let maxArrayLength = elements.length;
    let i = Math.floor(maxArrayLength / 2 - 1);
    let k = elements.length - 1;

    while (i >= 0) {
      await this.heapify(elements, maxArrayLength, i);
      i--;
    }

    while (k >= 0) {
      this.stopRunning();

      this.setElementsActiveStatus(elements, 0, k, true);
      await this.delay(this._speed);
      this.swap(elements, 0, k);
      this.setElementsActiveStatus(elements, 0, k, false);
      this.setElementSortedStatus(elements, k);

      await this.heapify(elements, k, 0);
      k--;
    }
  }

  async heapify(elements: SortElement[], length: number, index: number) {
    this.stopRunning();

    var left = 2 * index + 1;
    var right = 2 * index + 2;
    var max = index;

    if (left < length && elements[left].value > elements[max].value) {
      max = left;
    }

    if (right < length && elements[right].value > elements[max].value) {
      max = right;
    }

    if (max != index) {
      this.setElementsActiveStatus(elements, index, max, true);
      await this.delay(this._speed);
      this.swap(elements, index, max);
      this.setElementsActiveStatus(elements, index, max, false);

      await this.heapify(elements, length, max);
    }
  }
}
