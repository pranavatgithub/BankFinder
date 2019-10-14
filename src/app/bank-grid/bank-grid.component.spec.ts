import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BankGridComponent } from './bank-grid.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponentService } from '../app-component.service';

describe('BankGridComponent', () => {
  let component: BankGridComponent;
  let fixture: ComponentFixture<BankGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankGridComponent ],
      providers: [HttpClient, AppComponentService],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(BankGridComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
