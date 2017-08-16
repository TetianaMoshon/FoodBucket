import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    settings = {
        selectMode: 'multi',
        actions:{
            position: 'right'
        },
        columns: {
            id: {
                title: 'ID',
                width:'5%'
            },
            name: {
                title: 'Name'
            },
            surname: {
                title: 'Surname'
            },
            email: {
                title: 'Email'
            },
            phone:{
                title:'Phone'
            },
            city:{
                title:'City'
            },
            adress:{
                title:'Adress'
            },

        }
    };

    data = [
        {
            id: 1,
            name: "Leanne",
            surname: "Bret",
            email: "Sincere@april.biz",
            phone: "06566565",
            city:"Kiev",
            adress:"St.Peremogy, 95"
        },
        {
            id: 2,
            name: "Katya",
            surname: "Kvitka",
            email: "kvitka@april.biz",
            phone: "06566565",
            city:"Zhytomir",
            adress:"St.Peremogy, 95"
        }
    ];

}
