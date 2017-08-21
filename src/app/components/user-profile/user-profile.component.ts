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
