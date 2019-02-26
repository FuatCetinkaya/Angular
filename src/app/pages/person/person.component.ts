import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  constructor(private personService: PersonService ) {  }

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.personService.form.controls;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.personService.form.valid) {
      if (this.personService.form.get('$key').value == null) {
        this.personService.addPerson(this.personService.form.value);
      } else {
        this.personService.updatePerson(this.personService.form.value);
      }
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.personService.form.reset();
      // Reset Form
      this.personService.form.setValue({
        $key: null,
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: ''
      });
    }
  }

}
