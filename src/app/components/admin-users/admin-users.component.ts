import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {Headers} from '@angular/http';


import {UserService} from '../../client/api/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
    settings = {
        actions: {
            position: 'right',
            delete: 'true',
            columnTitle: ' ',
        },
        delete: {
            addButtonContent: 'OFF'
        },
        add: {
            addButtonContent: 'Add'
        },
        pager: {
            display: true,
            perPage: 5,
        },
        mode: 'external',
        columns: {
            userId: {
                title: 'ID',
                width: '6%'
            },
            firstName: {
                title: 'Name'
            },
            lastName: {
                title: 'Surname'
            },
            email: {
                title: 'Email'
            },
            phone:  {
                title: 'Phone'
            },
            city: {
                title: 'City'
            },
            address: {
                title: 'Address'
            },
            active: {
                title: 'Active'
            },
        }
    };
    public data;
    public newUser;

    constructor(protected userService: UserService, private router: Router) {
        const headers = new Headers();
        const token = sessionStorage.getItem('JWT');
        console.log(token);
        headers.append('x-my-jwt', token);
        this.userService.getAllUsers(1, 2, true, {headers: headers})
            .subscribe(
                user => {
                    this.data =  user;
                },
                err => console.log(err)
            );
    }

    onCreateClick(event, eventName: string): void {
        this.changeRoute('/admin/users/create');
    }

    onEditClick(event, eventName: string): void {
        this.changeRoute(`/admin/users/${event.data.userId}/edit`);

    }

    onDeleteClick(event, eventName: string): void {
        this.userService.findUserById(event.data.userId)
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
                                            this.data =  addUser;
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
        this.router.navigateByUrl(routeValue,) ;
    }

    ngOnInit() {
    }
}
