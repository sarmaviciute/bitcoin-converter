import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ConvertedResultComponent } from './converted-result.component';


describe('ConvertedResultComponent', () => {
  let component: ConvertedResultComponent;
  let fixture: ComponentFixture<ConvertedResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [ ConvertedResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertedResultComponent);
    component = fixture.componentInstance;
    component.supportedCurrencies = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
