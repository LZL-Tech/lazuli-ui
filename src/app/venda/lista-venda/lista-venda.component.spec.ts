import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVendaComponent } from './lista-venda.component';

describe('ListaVendaComponent', () => {
  let component: ListaVendaComponent;
  let fixture: ComponentFixture<ListaVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
