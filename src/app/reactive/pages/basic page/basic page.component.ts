import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl("",[],[]),
  //   price: new FormControl(0,[],[]),
  //   inStorage: new FormControl(0,[],[])

  // });

  // manera de hacerlo com FormBuilder
  // se le pasa un objeto con los valores por defecto (name, price, inStorage) donde [valor por defecto, validadores, validadores asincronos]
  public myForm: FormGroup = this.fb.group({
    name: ["",[Validators.required,Validators.minLength(3)]],
    price: [0,[Validators.required,Validators.min(0)]],
    inStorage: [0,[Validators.required,Validators.min(0)]]
  })

  constructor(private fb:FormBuilder ){}

  ngOnInit(): void {
    // this.myForm.reset({ price:10 , inStorage:200})
  }

  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field:string):string | null{
    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};
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

  onSave():void{
    if( this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    // permite volver a todos sus valores por defecto
    this.myForm.reset()

  }


 }
