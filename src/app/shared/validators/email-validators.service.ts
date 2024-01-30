import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidators implements AsyncValidator {
  // el AbstractControl<any, any> viene siento equivalenete a un formControl , el cual regresa un observable o promesa , con el objeto
  // ValidationErrors = {[key: string]: any;


  // validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({email});

  //  return  of({ emailTaken: true}).pipe(
  //   delay(2000)
  //  )
  // }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log({ email });

    const httpCallbservable = new Observable<ValidationErrors | null>((subscriber) => {
      console.log({ email });

      if (email === 'joeljim2293@gmail.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
      }
      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay(3000)
    );
    return httpCallbservable;
  }


}
