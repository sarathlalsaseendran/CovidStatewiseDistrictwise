import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Testability } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { DataService } from './data.service';

class MockDataService extends DataService {
  public getStateData(date: string): Observable<any> {
    return of();
  }
}
describe('AppComponent', () => {
  let testDataService: DataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule, MatDialogModule],
      providers: [DatePipe, DataService],
    }).compileComponents();

    testDataService = TestBed.get(DataService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Covid19IndianTracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Covid19IndianTracker');
  });

  it('should check the service', () => {
    expect(testDataService instanceof DataService).toBeTruthy();
  });

  it('should check the injected service', inject(
    [DataService],
    (injectedService: DataService) => {
      expect(injectedService).toBeTruthy();
    }
  ));
});
