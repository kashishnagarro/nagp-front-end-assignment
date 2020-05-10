import { Component, OnInit, Input } from '@angular/core';
import { IGrocery } from 'src/app/shared/interfaces';
import * as Service from 'src/app/core/services/index'

@Component({
  selector: 'gm-groceries-grid',
  templateUrl: './groceries-grid.component.html',
  styleUrls: ['./groceries-grid.component.scss']
})
export class GroceriesGridComponent implements OnInit {

  @Input() groceries: IGrocery[] = [];

  constructor(private sorterService: Service.SorterService, public trackbyService: Service.TrackByService) { }

  ngOnInit() {

  }

  sort(prop: string) {
    this.sorterService.sort(this.groceries, prop);
  }

}
