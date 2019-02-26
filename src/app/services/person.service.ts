import { Injectable } from '@angular/core';
import { Person } from '../shared/person';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  personList: AngularFireList<any>;    // List

  constructor(private db: AngularFireDatabase) { }

  form = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  addPerson(person: Person) {
    this.personList.push({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      mobileNumber: person.mobileNumber
    });
  }

  getPersonsList() {
    this.personList = this.db.list('/api/Person');
    return this.personList.snapshotChanges();
  }

  updatePerson(person: Person) {
    this.personList.update(person.$key,
      {
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        mobileNumber: person.mobileNumber
      });
  }

  deletePerson($key: string) {
    this.personList.remove($key);
  }

  populateForm(person) {
    this.form.setValue(person);
  }

}
