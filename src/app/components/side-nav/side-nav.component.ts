import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { SideNavDirection } from './side-nav-direction';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  showSideNav:Observable<boolean>;
  @Input() sidenavTemplateRef: any;
  @Input() duration: number = 0.25;
  @Input() navWidth: number = window.innerWidth;
  @Input() direction:string = SideNavDirection.Left;

  constructor(private navService: NavigationService) { 
    this.showSideNav = this.navService.getShowNav();
  }

  ngOnInit(): void { 
  }

  onSidebarClose() {
    this.navService.setShowNav(false);
  }

  getSideNavBarStyle(showNav: any): any {
    let navBarStyle: any = {};
    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = `${this.navWidth}px`;
    navBarStyle[this.direction] = `${(showNav ? 0 : (this.navWidth * -1))}px`;

    console.log(navBarStyle);
    return navBarStyle;
  }
}
