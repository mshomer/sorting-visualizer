import { Injectable } from '@angular/core';
import { SortElement } from '../menu/menu.component';
import { SortService } from './sort.service';

@Injectable({
  providedIn: 'root',
})
export class MergeSortService extends SortService {
  private _speed: number;
  private sortedElements: SortElement[];
  private _leftArrLength: number;
  private _rightArrLength: number;

  constructor() {
    super();
  }

  async sort(elements: SortElement[], speed: number): Promise<void> {
    this._speed = speed;
    this._runSort = true;
    this.sortedElements = elements;

    return new Promise(async (resolve, reject) => {
      try {
        await this.mergesort(elements, 0);
      } catch {
        await this.clearElementsStatuses(elements);
        reject();
        return;
      }
      resolve();
    });
  }

  async mergesort(array: SortElement[], offsetMidpoint: number) {
    if (array.length < 2) {
      return array;
    }

    const midpoint = Math.round(array.length / 2);
    const leftArr = array.slice(0, midpoint);
    const rightArr = array.slice(midpoint, array.length);
    return await this.merge(
      await this.mergesort(leftArr, 0 + offsetMidpoint),
      await this.mergesort(rightArr, midpoint + offsetMidpoint),
      offsetMidpoint
    );
  }

  async merge(
    leftArr: SortElement[],
    rightArr: SortElement[],
    midpoint: number
  ) {
    this.stopRunning();

    var sortedArr: SortElement[] = [];

    this._leftArrLength = leftArr.length;
    this._rightArrLength = rightArr.length;

    await this.setElementsActiveBackgroundStatus('yellow', midpoint);

    while (leftArr && rightArr && leftArr.length && rightArr.length) {
      this.stopRunning();
      const leftIndex = this.findIndex(
        leftArr[0].value,
        sortedArr.length + midpoint
      );
      const rightIndex = this.findIndex(
        rightArr[0].value,
        sortedArr.length + midpoint
      );
      if (leftArr[0].value <= rightArr[0].value) {
        await this.swapDealy(
          leftArr[0].value,
          leftIndex,
          rightArr[0].value,
          rightIndex,
          midpoint,
          sortedArr
        );
        sortedArr.push(leftArr[0]);
        leftArr = leftArr.slice(1);
      } else {
        await this.swapDealy(
          leftArr[0].value,
          midpoint + sortedArr.length,
          rightArr[0].value,
          rightIndex,
          midpoint,
          sortedArr
        );
        sortedArr.push(rightArr[0]);
        rightArr = rightArr.slice(1);
      }
    }
    while (leftArr && leftArr.length) {
      this.stopRunning();
      await this.swapDealy(
        this.sortedElements[midpoint + sortedArr.length].value,
        midpoint + sortedArr.length,
        leftArr[0].value,
        this.findIndex(leftArr[0].value, sortedArr.length + midpoint),
        midpoint,
        sortedArr
      );
      sortedArr.push(leftArr.shift());
    }
    while (rightArr && rightArr.length) {
      this.stopRunning();
      await this.swapDealy(
        this.sortedElements[midpoint + sortedArr.length].value,
        midpoint + sortedArr.length,
        rightArr[0].value,
        this.findIndex(rightArr[0].value, sortedArr.length + midpoint),
        midpoint,
        sortedArr
      );
      sortedArr.push(rightArr.shift());
    }

    await this.setElementsActiveBackgroundStatus(null, midpoint);

    return sortedArr;
  }

  async swapDealy(
    leftValue: number,
    leftIndex: number,
    rightValue: number,
    rightIndex: number,
    midpoint: number,
    sortedArr: SortElement[]
  ) {
    this.setElementsActiveStatus(
      this.sortedElements,
      leftIndex,
      rightIndex,
      true
    );
    this.sortedElements[midpoint + sortedArr.length].active = false;
    this.sortedElements[midpoint + sortedArr.length].background = 'blue';
    await this.delay(this._speed);
    const index = leftValue < rightValue ? leftIndex : rightIndex;
    await this.setSortedElement(index);
    this.setElementsActiveStatus(
      this.sortedElements,
      leftIndex,
      rightIndex,
      false
    );
    this.sortedElements[midpoint + sortedArr.length].background = 'yellow';
    this.swap(this.sortedElements, midpoint + sortedArr.length, index);
    await this.delay(this._speed);
  }

  async setElementsActiveBackgroundStatus(color: string, offset: number) {
    const maxLength = Math.max(this._leftArrLength, this._rightArrLength);
    for (let i = 0; i < maxLength; i++) {
      if (i < this._leftArrLength) {
        this.sortedElements[i + offset].background = color;
      }
      if (i < this._rightArrLength) {
        this.sortedElements[
          i + offset + this._leftArrLength
        ].background = color;
      }
    }

    this.newElements.next(this.sortedElements);
    await this.delay(this._speed);
  }

  async setSortedElement(index: number) {
    if (
      this.sortedElements.length ==
      this._leftArrLength + this._rightArrLength
    ) {
      this.setElementSortedStatus(this.sortedElements, index);
      await this.delay(this._speed);
    }
  }

  findIndex = (value, offset) =>
    this.sortedElements.findIndex(
      (e, index: number) => e.value == value && index >= offset
    );
}
