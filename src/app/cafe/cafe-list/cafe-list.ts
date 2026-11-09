import { Component, OnInit,signal } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  standalone: false,
  styleUrl: './cafe-list.css',
  templateUrl: './cafe-list.html',
})
export class CafeList implements OnInit {
  
  cafes = signal<Cafe[]>([]);

  constructor(private cafeService: CafeService) { }

  getCafesList() {
    this.cafeService.getCafes().subscribe(cafe => {
      this.cafes.set(cafe);
    })
  }

  ngOnInit() {
    this.getCafesList();
  }

}
