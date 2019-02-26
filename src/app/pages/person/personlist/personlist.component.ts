import { Component, OnInit } from '@angular/core';
// import { PersonService } from 'src/app/services/person.service';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'app-personlist',
  templateUrl: './personlist.component.html',
  styleUrls: ['./personlist.component.scss']
})
export class PersonlistComponent implements OnInit {

  constructor(private personService: PersonService) { }
  personArray = [];
  showDeletedMessage: boolean;
  searchText = '';

  ngOnInit() {
    this.personService.getPersonsList().subscribe(
      list => {
        this.personArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key) {
    if (confirm('Silmek istediğinize emin misin ?')) {
      this.personService.deletePerson($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }


  filterCondition(person) {
    return person.firstName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }

}
