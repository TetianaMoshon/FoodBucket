import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PagerService} from '../../services/pagination.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {UserService} from '../../client/api/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
    searchInput$ = new Subject<string>();
    sorted: boolean;
    nextSort: string;
    column: string;
    res;
    total;
    offset;
    limit = this.pagerService.getPager(this.total, 1);
    page;
    value: string;
    state = true;
    sort: string;
    users;
    pager: any = {};
    pagedItems: any[];
    source;
    random;
    newUser;

    constructor(
        protected userService: UserService,
        private router: Router,
        private pagerService: PagerService,
    ) {
    }


    fetchData() {
        this.defineOffset(this.limit.pageSize, 1);
        this.userService.getAllUsersWithHttpInfo(this.offset, this.limit.pageSize, 'desc', 'userId')
            .subscribe(
                response => {
                    this.users = response.json();
                    this.total = response.headers.get('x-total-records');
                    this.pager = this.pagerService.getPager(this.total, 1);
                    this.source = this.users;

                },
                err => console.log(err)

            );
        this.searchInput$
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(inputData => this.search(inputData));

    }

    onEditClick(event, id): void {
        this.changeRoute(`/admin/users/${id}/edit`);

    }

    onDeleteClick(event, id): void {
        this.defineOffset(this.limit.pageSize, this.pager.currentPage);
        if (confirm('Are you really want to delete user with id: ' + id + ' ?')) {
            this.userService.findUserById(parseInt(id, 10))
                .subscribe(
                    user => {
                        this.newUser = user;
                        this.newUser.active = false;
                        this.userService.updateUserById(this.newUser.userId, this.newUser)
                            .subscribe(
                                updateUser => {
                                    this.userService.getAllUsersWithHttpInfo(0, this.limit.pageSize,  'desc', 'userId')
                                        .subscribe(
                                            addUser => {
                                                this.source =  addUser;
                                                this.source = addUser.json();
                                                this.total = addUser.headers.get('x-total-records');
                                                this.pager = this.pagerService.getPager(this.total, 1);
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
    }

    changeRoute(routeValue) {
        this.router.navigateByUrl(routeValue) ;
    }

    ngOnInit() {
        this.fetchData();
        this.random = Date.now();
    }

    defineCol(value: string) {
        this.column = value;
    }

    search(searchStr) {
        if (searchStr.trim() !== '') {
            this.userService.getAllUsersWithHttpInfo(0, this.limit.pageSize, 'desc', 'userId', true, searchStr, this.column)
                .subscribe(res => {
                    this.source = res.json();
                    this.pager = this.pagerService.getPager(this.limit.pageSize, 1);}
                );
        } else {
            this.source = this.users;
            this.pager = this.pagerService.getPager(this.total, 1);
        }
    }

    toggle(state: boolean) {
        this.state = state;
        this.sort = this.state ? 'desc' : 'asc';
    }

    defineOffset(limit: number, page: number) {
        this.offset = page * limit - limit;
    }

    setPage(page: number) {
        this.source = [];
        this.defineOffset(this.limit.pageSize, page);
        if (this.sorted) {
            this.userService.getAllUsers(this.offset, this.limit.pageSize, this.nextSort, this.value )
                .subscribe(users => {
                    this.source = users;
                });
        } else  {
            this.userService.getAllUsers( this.offset, this.limit.pageSize, 'desc', 'userId')
                .subscribe(users => {
                    this.source = users;
                });
        }

        this.pager.currentPage = page;
    }

    onSortClick(value: string): void {
        this.toggle(!this.state);
        this.defineOffset(this.limit.pageSize, this.pager.currentPage);
        this.userService.getAllUsers(this.offset, this.limit.pageSize, this.sort, value ).subscribe(users => {
            this.value = value;
            this.source = users;
        });
        this.sorted = true;
        this.nextSort = this.sort;
    }
}
