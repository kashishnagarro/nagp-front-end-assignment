import { Component, OnInit, ViewChild } from '@angular/core';
import { IGrocery } from 'src/app/shared/interfaces';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService, LoggerService } from 'src/app/core/services';
import { ToastrService, MessageType } from 'src/app/core/toastr/toastr.service';
import { ModalService, IModalContent } from 'src/app/core/modal/modal.service';

@Component({
  selector: 'gm-grocery-edit',
  templateUrl: './grocery-edit.component.html',
  styleUrls: ['./grocery-edit.component.scss']
})
export class GroceryEditComponent implements OnInit {

  grocery: IGrocery =
    {
      id: 0,
      name: '',
      details: '',
      imageUrl: '',
      price: 0,
      quantity: 0,
      createdOn: new Date(),
      updatedOn: new Date()
    };
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  @ViewChild('groceryForm', { static: true }) groceryForm: NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private toastr: ToastrService,
              private modalService: ModalService,
              private logger: LoggerService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Don't technically need that here
    // since param won't be changing while component is alive.
    // Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.operationText = 'Update';
        this.getGrocery(id);
      }
    });
  }

  getGrocery(id: number) {
    this.dataService.getGrocery(id).subscribe((grocery: IGrocery) => {
      this.grocery = grocery;
    });
  }

  submit() {
    if (this.grocery.id === 0) {
      this.grocery.createdOn = new Date();
      this.grocery.updatedOn = new Date();
      this.dataService.insertGrocery(this.grocery)
        .subscribe((insertedGrocery: IGrocery) => {
          if (insertedGrocery) {
            // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
            this.groceryForm.form.markAsPristine();
            this.router.navigate(['/groceries']);
          } else {
            const msg = 'Unable to insert grocery';
            this.toastr.showMessage(msg, MessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    } else {
      this.grocery.updatedOn = new Date();
      this.dataService.updateGrocery(this.grocery)
        .subscribe((status: boolean) => {
          if (status) {
            // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
            this.groceryForm.form.markAsPristine();
            this.toastr.showMessage('Operation performed successfully.', MessageType.Success);
            this.router.navigate(['/groceries']);
          } else {
            const msg = 'Unable to update grocery';
            this.toastr.showMessage(msg, MessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/groceries']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteGrocery(this.grocery.id)
      .subscribe((status: boolean) => {
        if (status) {
          this.router.navigate(['/groceries']);
        } else {
          this.errorMessage = 'Unable to delete grocery';
        }
      },
        (err) => this.logger.log(err));
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.groceryForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent);
  }

}
