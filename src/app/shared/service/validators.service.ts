import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class validatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = (control :FormControl ):ValidationErrors | null => {

    const value : string = control.value.trim().toLowerCase();
    console.log("value",value);

      if( value === 'strider'){
          return {
        noStrider:true
          }
        }

      return null
  }

public isValidField(form:FormGroup,field:string){
  return form.controls[field].errors && form.controls[field].touched;

}

getFieldError(form:FormGroup, field:string):string | null{
  if( !form.controls[field] ) return null;

  const errors =form.controls[field].errors || {};
  console.log("errors",errors);

  for ( const key of Object.keys(errors)) {
  switch(key){
    case 'required':
      return 'Este campo es requerido';

    case 'minlength':
        return ` Minimo ${errors['minlength'].requiredLength } caracter.`;
  }

  }
  return null;
}


}


