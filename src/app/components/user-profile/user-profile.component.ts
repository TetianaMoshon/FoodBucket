import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  constructor() { }

  changeEditability(event) {
     event.currentTarget.parentElement.setAttribute('contenteditable', 'true');
     event.currentTarget.parentElement.focus();
  }

  showAchievements(event) {
     let elem = event.currentTarget.nextElementSibling;
      elem.classList.toggle('is-show');
  }

  ngOnInit() {
  }


}
