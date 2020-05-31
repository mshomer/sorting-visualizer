import { Injectable } from '@angular/core';
import { SortElement } from '../menu/menu.component';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root',
})
export class QuickSortService extends SortService {
  private _speed: number;

  constructor() {
    super();
  }

  async sort(elements: SortElement[], speed: number): Promise<void> {
    this._speed = speed;
    this._runSort = true;

    return new Promise(async (resolve, reject) => {
      try {
        await this.quickSort(elements, 0, elements.length - 1);
      } catch {
        this.clearElementsStatuses(elements);
        reject();
        return;
      }

      resolve();
    });
  }

  async quickSort(items, left, right) {
    this.stopRunning();

    if (left >= right) {
      this.setElementSortedStatus(items, left);
      await this.delay(this._speed);
      return;
    }

    let pivotIndex = await this.pivot(items, left, right);
    await this.quickSort(items, left, pivotIndex - 1);
    await this.quickSort(items, pivotIndex + 1, right);
  }

  async pivot(items: SortElement[], left: number, right: number) {
    let pivot = left,
      lPointer = left + 1, //left pointer
      rPointer = right; //right pointer

    this.setElementsBackground(items, pivot, 'yellow');
    await this.delay(this._speed);

    while (lPointer <= rPointer) {
      this.stopRunning();

      this.setElementsActiveStatus(items, lPointer, rPointer, true);
      await this.delay(this._speed);

      while (
        lPointer < items.length &&
        items[lPointer].value < items[pivot].value
      ) {
        this.stopRunning();
        this.setElementsActiveStatus(items, lPointer, null, false);
        lPointer++;
        this.setElementsActiveStatus(items, lPointer, null, true);
        await this.delay(this._speed);
      }

      while (rPointer >= 0 && items[rPointer].value > items[pivot].value) {
        this.stopRunning();
        this.setElementsActiveStatus(items, rPointer, null, false);
        rPointer--;
        this.setElementsActiveStatus(items, rPointer, null, true);
        await this.delay(this._speed);
      }

      if (lPointer <= rPointer) {
        this.swap(items, lPointer, rPointer);
        await this.delay(this._speed);

        lPointer++;
        rPointer--;

        if (lPointer <= rPointer) {
          this.setElementsActiveStatus(
            items,
            lPointer - 1,
            rPointer + 1,
            false
          );
        }
      }
    }

    this.stopRunning();
    this.setElementsActiveStatus(items, lPointer - 1, rPointer + 1, false);
    this.setElementsBackground(items, pivot, null);
    this.setElementSortedStatus(items, pivot);
    this.swap(items, rPointer, pivot);
    await this.delay(this._speed);

    return rPointer;
  }
}
