import { Component, OnInit, signal, computed } from '@angular/core';
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
  tipos = computed(() => {
    const totales: Record<string, number> = {};
    for (const cafe of this.cafes()) {
      totales[cafe.tipo] = (totales[cafe.tipo] ?? 0) + 1;
    }
    return Object.entries(totales).map(([tipo, total]) => ({ tipo, total }));

  });

}
