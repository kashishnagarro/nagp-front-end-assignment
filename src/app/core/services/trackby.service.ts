import { Injectable } from '@angular/core';
import { IGrocery } from 'src/app/shared/interfaces';

@Injectable()
export class TrackByService {

  grocery(index: number, model: IGrocery) {
    return model.id;
  }



}
