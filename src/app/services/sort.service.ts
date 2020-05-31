import { SortElement } from '../menu/menu.component';
import { Subject } from 'rxjs';

export abstract class SortService {
  protected _runSort: boolean;

  protected delay = (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(), ms));

  protected swap(array: SortElement[], index_A: number, index_B: number) {
    var temp = array[index_A];

    array[index_A] = array[index_B];
    array[index_B] = temp;
  }

  public stop = () => (this._runSort = false);

  public stopRunning() {
    if (!this._runSort) {
      throw 'stop running';
    }
  }

  clearElementsStatuses(array: SortElement[]) {
    for (let element of array) {
      element.active = false;
      element.sorted = false;
      element.background = null;
    }
  }

  public setElementsActiveStatus(
    array: SortElement[],
    index_A: number,
    index_B: number,
    active: boolean
  ) {
    if (index_A != null && index_A < array.length) {
      array[index_A].active = active;
    }
    if (index_B != null && index_B < array.length) {
      array[index_B].active = active;
    }

    this.newElements.next(array);
  }

  public setElementSortedStatus(array: SortElement[], index: number) {
    array[index].sorted = true;
    this.newElements.next(array);
  }

  public setElementsBackground(
    array: SortElement[],
    index: number,
    color: string
  ) {
    array[index].background = color;
    this.newElements.next(array);
  }

  public newElements: Subject<SortElement[]> = new Subject();
  public abstract sort(elements: SortElement[], speed: number): Promise<void>;
}
