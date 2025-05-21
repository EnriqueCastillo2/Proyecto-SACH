import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, map, mergeMap } from 'rxjs';
@Component({
  selector: 'app-header-section',
  imports: [RouterModule,MatIconModule],
  templateUrl: './home-section.component.html',
  styleUrl: './home-section.component.css'
})
export class HomeSectionComponent {
Header: string='HABITACIONES';


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.Header = data['title'] || 'HABITACIONES';
      });
  }
  

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUser');

    this.router.navigate(['/']); 
  }
}
