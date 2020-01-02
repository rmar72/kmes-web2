import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class IdentityMngtService {

  constructor() { }

  search(term: Observable<string>){
    return term.pipe(
      debounceTime(500)
    )
  }

}
