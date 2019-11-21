import {Component, OnInit} from '@angular/core';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated = false;
  $ = window['jQuery'];

  constructor(private loginService: LoginService) {
    this.loginService.isAuthenticated.asObservable().subscribe(e => this.isAuthenticated = e);
  }

  hasRole(role: string): boolean {
    return this.loginService.hasRole(role);
  }

  get userInfo(): any {
    return this.loginService.getUserInfo();
  }

  ngOnInit(): void {
    setTimeout(() => this.mainMenu(), 1000);
  }

  private mainMenu() {
    const self = this;

    const width = window.innerWidth;
     if (width < 767) {
      this.$('.page-topbar').addClass('sidebar_shift').removeClass('chat_shift');
      this.$('.page-sidebar').addClass('collapseit').removeClass('expandit');
      this.$('#main-content').addClass('sidebar_shift').removeClass('chat_shift');
      this.$('.page-chatapi').removeClass('showit').addClass('hideit');
      this.$('.chatapi-windows').removeClass('showit').addClass('hideit');
    }

    this.$('.page-topbar .sidebar_toggle').on('click', function() {
      const chatarea = self.$('.page-chatapi');
      const chatwindow = self.$('.chatapi-windows');
      const topbar = self.$('.page-topbar');
      const mainarea = self.$('#main-content');
      const menuarea = self.$('.page-sidebar');

      if (menuarea.hasClass('collapseit') || menuarea.hasClass('chat_shift')) {
        menuarea.addClass('expandit').removeClass('collapseit').removeClass('chat_shift');
        topbar.removeClass('sidebar_shift').removeClass('chat_shift');
        mainarea.removeClass('sidebar_shift').removeClass('chat_shift');
        chatarea.addClass('hideit').removeClass('showit');
        chatwindow.addClass('hideit').removeClass('showit');
      } else {
        menuarea.addClass('collapseit').removeClass('expandit').removeClass('chat_shift');
        topbar.addClass('sidebar_shift').removeClass('chat_shift');
        mainarea.addClass('sidebar_shift').removeClass('chat_shift');
      }
    });

    this.$('#main-menu-wrapper li a').click(function (e) {
      if (self.$(this).next().hasClass('sub-menu') === false) {
        return;
      }

      const parent = self.$(this).parent().parent();
      const sub = self.$(this).next();

      parent.children('li.open').children('.sub-menu').slideUp(200);
      parent.children('li.open').children('a').children('.arrow').removeClass('open');
      parent.children('li').removeClass('open');

      if (sub.is(':visible')) {
        self.$(this).find('.arrow').removeClass('open');
        sub.slideUp(200);
      } else {
        self.$(this).parent().addClass('open');
        self.$(this).find('.arrow').addClass('open');
        sub.slideDown(200);
      }
    });

  }

  logout() {
    this.loginService.loggout();
  }
}
