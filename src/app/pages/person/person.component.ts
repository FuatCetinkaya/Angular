import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/shared/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  Person: Person[];                 // Save students data in Student's array.

  constructor(private personService: PersonService ) {

  }

  ngOnInit() {
    let s = this.personService.GetPersonsList();
    this.Person = [];
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        console.log('item:' + a['$key']); 
        this.Person.push(a as Person);
      });
    });
    console.log(this.Person);
  }

}
