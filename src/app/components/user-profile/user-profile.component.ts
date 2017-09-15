import { Component, OnInit } from '@angular/core';
import { UserService } from '../../client/api/user.service';
import { User } from './user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    public user: User;

  constructor(private findUserByIdAPI: UserService) {
      this.user = new User(0, ' ', ' ', ' ', 0, ' ', ' ', false);
      this.findUserByIdAPI.findUserById(JSON.parse(localStorage.getItem('currentUser')))
          .subscribe(reg => {
              this.user.firstName = reg.firstName;
              this.user.lastName = reg.lastName;
              this.user.email = reg.email;
              this.user.city = reg.city;
              this.user.address = reg.address;
          }, err => {
              console.log('error reg' + err);
          });
  }

  changeEditability(event) {
     event.currentTarget.parentElement.setAttribute('contenteditable', 'true');
     event.currentTarget.parentElement.focus();
  }

  showAchievements(event) {
     const elem = event.currentTarget.nextElementSibling;
     elem.classList.toggle('is-show');
     event.currentTarget.classList.toggle('active');
     elem.nextElementSibling.classList.toggle('hide');
  }

  highlight(event) {
      const elem = event.currentTarget.nextElementSibling.nextElementSibling;
      elem.classList.toggle('highlight');
  }

  ngOnInit() {
  }


}
