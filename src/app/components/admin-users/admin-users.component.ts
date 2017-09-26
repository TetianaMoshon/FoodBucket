import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';


import {UserService} from '../../client/api/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
    source;
    random;
    newUser;

    constructor(
        protected userService: UserService,
        private router: Router) {
    }


    fetchData() {
        this.userService.getAllUsers(1, 2, true)
            .subscribe(
                users => {
                    this.source = users;
                },
                err => console.log(err)
            );
    }

    onCreateClick(event): void {
        this.changeRoute('/admin/users/create');
    }

    onEditClick(event, id): void {
        this.changeRoute(`/admin/users/${id}/edit`);

    }

    onDeleteClick(event, id): void {
        this.userService.findUserById(parseInt(id, 10))
            .subscribe(
                user => {
                    this.newUser = user;
                    this.newUser.active = false;
                    this.userService.updateUserById(this.newUser.userId, this.newUser)
                        .subscribe(
                            updateUser => {
                                this.userService.getAllUsers(1, 2, true)
                                    .subscribe(
                                        addUser => {
                                            this.source =  addUser;
                                        },
                                        err => console.log(err)
                                    );
                            },
                            err => console.log(err)
                        );
                },
                err => console.log(err)
            );
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue) ;
    }

    ngOnInit() {
        this.fetchData();
        this.random = Date.now();
    }
}
