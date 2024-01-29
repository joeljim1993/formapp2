import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormControl , FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styles: [
  ]
})
export class SwitchesPageComponent {


  public myForm:FormGroup = this.fb.group({
    gender:["M",Validators.required],
    // significa que tiene que haber un valor seleccionado
    wantNotifications:[true,Validators.required],
    termsAndConditions:[true,Validators.requiredTrue],

  })


constructor(private fb:FormBuilder ) { }
// ngSubmit
onSave(){
  if ( this.myForm.invalid ) {
    this.myForm.markAllAsTouched();
    return;
  }
  console.log(this.myForm.value);

}
isValidField(field:string):boolean | null{
  return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
}

}
