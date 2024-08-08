import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  user!: any ;
  constructor(private _userService:UserService ,private router: Router ,  private route: ActivatedRoute,){}
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._userService.getUser(Number(id)).subscribe(response => {
        this.user = response.data;
      });
    }
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
