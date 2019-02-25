import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Person } from '../shared/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  personsRef: AngularFireList<any>;    // Reference to Person data list, its an Observable
  personRef: AngularFireObject<any>;   // Reference to Person object, its an Observable too

  constructor(private db: AngularFireDatabase) { }

  // Create Person
  AddPerson(person: Person) {
    this.personsRef.push({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      mobileNumber: person.mobileNumber
    });
  }

  // Fetch Single Person Object
  GetPerson(id: string) {
    this.personRef = this.db.object('persons-list/' + id);
    return this.personRef;
  }

  // Fetch Persons List
  GetPersonsList(): AngularFireList<any[]> {
    this.personsRef = this.db.list('data/person');
    return this.personsRef;
  }

  // Update Person Object
  UpdatePerson(person: Person) {
    this.personRef.update({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      mobileNumber: person.mobileNumber
    });
  }

  // Delete Person Object
  DeletePerson(id: string) {
    this.personRef = this.db.object('persons-list/' + id);
    this.personRef.remove();
  }

}
