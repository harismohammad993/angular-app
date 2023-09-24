import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup  = new FormGroup({});
  forbiddenUsernames = ['Chris', 'Anna'];

  constructor() { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        // 'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    });

    // this.signUpForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );

    // this.signUpForm.statusChanges.subscribe(
    //   (status) => {
    //     console.log(status);
    //   }
    // );

    this.signUpForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'Max@gmail.com',
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signUpForm.patchValue({
      'userData': {
        'username': 'Anna',
      },
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }

  isValidUser() {
    // const username = this.signUpForm.get('username');
    const username = this.signUpForm.get('userData.username');

    if (username) {
      return username.status == 'INVALID' && username.touched;
    }

    return false;
  }

  isValidEmail() {
    // const email = this.signUpForm.get('email');
    const email = this.signUpForm.get('userData.email');

    if (email) {
      return email.status == 'INVALID' && email.touched;
    }

    return false;
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies'))?.controls;
  }

  onAddHobby() {
    (<FormArray>this.signUpForm.get('hobbies')).push(
      new FormControl(null, Validators.required)
    );
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }

  hasInvalidError() {
    const username = this.signUpForm.get('userData.username');

    if (username) {
      return username.errors && username.errors['nameIsForbidden'];
    }

    return false;
  }

  hasRequiredError() {
    const username = this.signUpForm.get('userData.username');

    if (username) {
      return username.errors && username.errors['required'];
    }

    return false;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );

    return promise;
  }
}
