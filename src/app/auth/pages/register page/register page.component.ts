import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as customValidators from 'src/app/shared/validators/validators';
import { validatorsService } from '../../../shared/service/validators.service';
import { EmailValidators } from 'src/app/shared/validators/email-validators.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register page.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {

  // todo: resolver por que no agarra el validador cantBeStrider
  public myForm : FormGroup = this.fb.group({
    name:["",[Validators.required,Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // email:["",[Validators.required,Validators.pattern(this.validatorsService.emailPattern)],[new EmailValidators()]],
    email:["",[Validators.required,Validators.pattern(this.validatorsService.emailPattern)],[this.emailValidators]],

    username:["",[Validators.required,this.validatorsService.cantBeStrider  ]],
    password:["",[Validators.required,Validators.minLength(6)]],
    password2:["",[Validators.required]],



  },{
    Validators:[
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2'),
    ]
  })

  constructor(
    private fb:FormBuilder,
    private validatorsService:validatorsService,
    private emailValidators:EmailValidators,

    ){}

  isValidField(field:string){
    return this.validatorsService.isValidField(this.myForm,field );
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log("onsubmit");

  }





 }
