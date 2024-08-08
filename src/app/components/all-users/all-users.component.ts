import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  constructor(private _userService: UserService, private router: Router) { }

  searchTerm: any;
  users: any[] = [];
  totalUsers: number = 0;
  usersPerPage: number = 6; 
  currentPage: number = 0;
  paginatedUsers: any[] = [];

  ngOnInit() {
    this.loadUsers(this.currentPage + 1);
  }

  loadUsers(page: number) {
    this._userService.getAllUsers(page).subscribe(response => {
      this.users = response.data;
      this.totalUsers = response.total;
      this.paginateUsers();
    });
  }

  onSelect(id: number) {
    this.router.navigate(['/user', id]);
  }

  paginateUsers() {
    const start = this.currentPage * this.usersPerPage;
    const end = start + this.usersPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.usersPerPage = event.pageSize;
    this.loadUsers(this.currentPage + 1);
  }
}
