import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IGrocery } from '../../shared/interfaces';
import { DataService } from '../../core/services';

@Component({
  selector: 'gm-grocery-details',
  templateUrl: './grocery-details.component.html',
  styleUrls: ['./grocery-details.component.scss']
})
export class GroceryDetailsComponent implements OnInit {

  grocery: IGrocery;
  mapEnabled: boolean;
  mapComponentRef: ComponentRef<any>;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.dataService.getGrocery(id)
          .subscribe((grocery: IGrocery) => {
            this.grocery = grocery;
          });
      }
    });
  }

}

