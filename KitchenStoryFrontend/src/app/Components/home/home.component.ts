import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  product: any;
  constructor(private router: Router, private toastr: ToastrService) { }

  search(name: string) {
    if (name == null) {
      this.toastr.warning('Please enter a product name!');
    } else {
      this.router.navigateByUrl("/product-search/" + name);
    }

  }

}
