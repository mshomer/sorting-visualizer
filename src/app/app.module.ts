import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutComponent } from './layout/layout.component';
import { BubbleSortService } from './services/bubble-sort.service';
import { HeapSortService } from './services/heap-sort.service';
import { MergeSortService } from './services/merge-sort.service';
import { QuickSortService } from './services/quick-sort.service';

@NgModule({
  declarations: [AppComponent, MenuComponent, LayoutComponent],
  imports: [BrowserModule, NgbModule],
  providers: [
    BubbleSortService,
    HeapSortService,
    MergeSortService,
    QuickSortService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
