import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import {CartCommunicationService} from '../../services/cart-communication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {

  constructor(public data: DataService,
              private cartCommunicationService: CartCommunicationService,
              public router: Router) { }

  ngOnInit() {
          const sidebarToggle = document.getElementsByClassName('sidebar-toggle') as HTMLCollectionOf<HTMLElement>;
          const body = document.querySelector('body');
          body.style.paddingTop = '50px';
          if (innerWidth >= 768) {body.style.paddingLeft = '200px'; } else {body.style.paddingLeft = '0px'; }
          window.addEventListener('resize', resizeFunction);
          function resizeFunction() {
              if (innerWidth >= 768) {
                  sidebarToggle[0].style.left = '200px';
                  body.style.paddingLeft = '200px';
              }else {
                  sidebarToggle[0].style.left = '-200px';
                  body.style.paddingLeft = '0px';
              }

          }
          const toggleButton = document.getElementById('menu-toggle');
          toggleButton.addEventListener('click', function (e) {
              e.preventDefault();
              const elem = document.getElementById('sidebar-wrapper');
              const left = window.getComputedStyle(elem, null).getPropertyValue('left');
              if (left === '200px') {
                  sidebarToggle[0].style.left = '-200px';
                  body.style.paddingLeft = '0px';
              } else if (left === '-200px') {
                  sidebarToggle[0].style.left = '200px';
                  body.style.paddingLeft = '200px';
              }
          });
  }
    public logOutFunc() {
        sessionStorage.clear();
        this.data.changeIsLogged(false);
        this.cartCommunicationService.userIsLoggedIn = false;
        window.location.reload();
    }
    public getBackToHomePage() {
        this.data.changeIsAdmin(true);
        /*this.router.navigate(['']);*/
    }

}
