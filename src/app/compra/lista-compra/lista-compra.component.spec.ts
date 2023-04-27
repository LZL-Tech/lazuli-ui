import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCompraComponent } from './lista-compra.component';

describe('ListaCompraComponent', () => {
  let component: ListaCompraComponent;
  let fixture: ComponentFixture<ListaCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
