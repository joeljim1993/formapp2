import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-page.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {

  public  myForm : FormGroup = this.fb.group({
    // en la linea siguiente hay error , debido a que la tercera opcion es para validaciones asincronas y da un error
    // name: ['',Validators.required, Validators.minLength(3)],
    name: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear',Validators.required],
      ['Death Stranding',Validators.required],

    ])

  }
  )
  public newFavorite:FormControl = new FormControl("",[Validators.required, Validators.minLength(3)])

  get favoritesGames(){
    // se recomienda el uso de formArray , para que no sea abstracto , revisar documentacion
    return    this.myForm.get('favoriteGames') as FormArray
  }

  constructor( private fb:FormBuilder){}

  onSubmit():void{
    console.log("se ejecuto el submit");
    console.log("value del form",this.myForm.value);

    if(this.myForm.invalid){
      // saber si el formulario ha sido tocado
      this.myForm.markAllAsTouched()
      return;
    }

    console.log("value del form",this.myForm.value);

    // resetear el formulario
    this.myForm.reset();
    ( this.myForm.controls['favoriteGames'] as FormArray )= this.fb.array([]);



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

  isValidFieldInArray( formArray:FormArray,index:number){
    return formArray.controls[index].errors && formArray.controls[index].touched;

  }
  onDeleteFavorite(index:number):void{
    // en Js los objectos se pasan por referencia , quiere decir que aqiui se elimina directamenete en el arreglo
    this.favoritesGames.removeAt(index);

  }
  // insertando favorite en el formArray
  onAddToFavorites():void{
    if(this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    // esta seria la manera si no estubviera trabajando con el formBuilder
    // this.favoritesGames.push(new FormControl(newGame,Validators.required))
    this.favoritesGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
    // ( this.myForm.controls['favoriteGames'] as FormArray )= this.fb.array([]);
  }

}
