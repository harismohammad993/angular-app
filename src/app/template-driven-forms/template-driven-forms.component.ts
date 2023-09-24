import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.css']
})
export class TemplateDrivenFormsComponent implements OnInit {
  @ViewChild('formEl') signUpForm: NgForm = new NgForm([], []);
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: '',
  };
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });
    this.signUpForm.form.patchValue({
      userData: {
        username: suggestedName,
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  //   console.log('Submitted');
  // }

  onSubmit() {
    console.log(this.signUpForm);
    this.submitted = true;

    this.user.username = this.signUpForm.form.value.userData.username;
    this.user.email = this.signUpForm.form.value.userData.email;
    this.user.secret = this.signUpForm.form.value.secret;
    this.user.answer = this.signUpForm.form.value.questionAnswer;
    this.user.gender = this.signUpForm.form.value.gender;

    this.signUpForm.reset();
  }
}
