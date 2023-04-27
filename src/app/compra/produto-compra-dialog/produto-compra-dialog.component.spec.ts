import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCompraDialogComponent } from './produto-compra-dialog.component';

describe('ProdutoCompraDialogComponent', () => {
  let component: ProdutoCompraDialogComponent;
  let fixture: ComponentFixture<ProdutoCompraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoCompraDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoCompraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
