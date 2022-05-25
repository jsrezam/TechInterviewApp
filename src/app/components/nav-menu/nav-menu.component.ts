import { Component, OnInit } from '@angular/core';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  faCodeBranch = faCodeBranch;
  constructor() { }

  ngOnInit(): void {
  }

}
