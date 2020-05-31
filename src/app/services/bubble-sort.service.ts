import { Injectable } from '@angular/core';
import { SortElement } from '../menu/menu.component';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root',
})
export class BubbleSortService extends SortService {
  private _speed: number;

  constructor() {
    super();
  }

  async sort(elements: SortElement[], speed: number): Promise<void> {
    this._runSort = true;
    this._speed = speed;

    return new Promise(async (resolve, reject) => {
      try {
        await this.bubbleSort(elements);
      } catch {
        this.clearElementsStatuses(elements);
        reject();
        return;
      }

      resolve();
    });
  }

  async bubbleSort(elements: SortElement[]) {
    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < elements.length - 1; j++) {
        this.stopRunning();

        this.setElementsActiveStatus(elements, j, j + 1, true);
        await this.delay(this._speed);

        if (elements[j].value > elements[j + 1].value) {
          this.swap(elements, j, j + 1);
        }

        this.setElementsActiveStatus(elements, j, j + 1, false);
      }

      this.setElementSortedStatus(elements, elements.length - 1 - i);
    }
  }
}
