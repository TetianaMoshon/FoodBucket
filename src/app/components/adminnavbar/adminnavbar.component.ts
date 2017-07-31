import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      document.addEventListener( 'DOMContentLoaded', function () {
          let sidebarToggle = document.getElementsByClassName("sidebar-toggle") as HTMLCollectionOf<HTMLElement>;
          let body = document.querySelector('body');
          body.style.paddingTop = '50px';
          if(innerWidth >=768){body.style.paddingLeft='200px';} else {body.style.paddingLeft='0px';}
          window.addEventListener("resize", resizeFunction);
          function resizeFunction() {
              if (innerWidth >=768) {
                  sidebarToggle[0].style.left="200px";
                  body.style.paddingLeft="200px";
              }else{
                  sidebarToggle[0].style.left="-200px";
                  body.style.paddingLeft="0px";
              }

          }
          let toggleButton = document.getElementById('menu-toggle');
          toggleButton.addEventListener('click', function (e) {
              e.preventDefault();
              let elem = document.getElementById("sidebar-wrapper");
              let left = window.getComputedStyle(elem,null).getPropertyValue("left");
              if(left == "200px"){
                  sidebarToggle[0].style.left="-200px";
                  body.style.paddingLeft='0px';
              }
              else if(left == "-200px"){
                  sidebarToggle[0].style.left="200px";
                  body.style.paddingLeft='200px';
              }
          })
      }, false );

  }

}
