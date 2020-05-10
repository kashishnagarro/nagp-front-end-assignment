import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { IGrocery, IPagedResults } from '../shared/interfaces';
import { LoggerService, FilterService, DataService } from '../core/services';

@Component({
  selector: 'gm-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.scss']
})
export class GroceriesComponent implements OnInit {

  title: string;
  filterText: string;
  groceries: IGrocery[] = [];
  totalRecords = 0;
  pageSize = 10;
  _filteredGroceries: IGrocery[] = [];

  get filteredGroceries() {
    return this._filteredGroceries;
  }

  set filteredGroceries(value: IGrocery[]) {
    this._filteredGroceries = value;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dataService: DataService,
              private filterService: FilterService,
              private logger: LoggerService) { }

  ngOnInit() {
    this.title = 'Grocery Management';
    this.filterText = 'Filter Groceries:';
    this.getGroceriesPage(1);
  }

  pageChanged(page: number) {
    this.getGroceriesPage(page);
  }

  getGroceriesPage(page: number) {
    this.dataService.getGroceriesPage((page - 1) * this.pageSize, this.pageSize)
      .subscribe((response: IPagedResults<IGrocery[]>) => {
        this.groceries = this.filteredGroceries = response.results;
        this.totalRecords = response.totalRecords;
      },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getGroceriesPage() retrieved groceries for page: ' + page));
  }

  filterChanged(data: string) {
    if (data && this.groceries) {
      data = data.toUpperCase();
      const props = ['name', 'details', 'quantity', 'price'];
      this.filteredGroceries = this.filterService.filter<IGrocery>(this.groceries, data, props);
    } else {
      this.filteredGroceries = this.groceries;
    }
  }
}

