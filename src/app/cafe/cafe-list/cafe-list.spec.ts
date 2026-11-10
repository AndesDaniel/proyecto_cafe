import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CafeList } from './cafe-list';
import { Cafe } from '../cafe';
import { faker } from '@faker-js/faker';
import { environment } from '../../../environments/environment';

function createCafe(id: number): Cafe {
  return new Cafe(id,
    faker.book.author(),
    faker.airline.aircraftType(),
    faker.location.city(),
    faker.food.adjective(),
    faker.number.int({ min: 1700, max: 2000 }),
    faker.image.url());
}

describe('CafeList', () => {
  let component: CafeList;
  let fixture: ComponentFixture<CafeList>;
  let httpMock: HttpTestingController;
  const url = environment.baseUrl

  function load(data: Cafe[]) {
    fixture.detectChanges();
    httpMock.expectOne(url).flush(data);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CafeList],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();


    fixture = TestBed.createComponent(CafeList);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('listado de 3 cafes', () => {
    const cafes = Array.from({ length: 3 }, (_, i) => createCafe(i + 1));
    beforeEach(() => load(cafes));

    it('debe tener los 3 cafes recibidos', () => {
      expect(component.cafes().length).toBe(3);
    });
    it('debe mostrar los 3 cafes recibidos', () => {
      expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(3);
    });
  });
});

