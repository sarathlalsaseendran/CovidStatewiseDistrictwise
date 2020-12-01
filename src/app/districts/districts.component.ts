import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StateDataStructure } from '../app.component';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css'],
})
export class DistrictsComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // datasource to bind UI
  dataSource = new MatTableDataSource<StateDataStructure>();
  // temp var for trasforming data.
  // To Do : Replace any with strongly typed interface
  disData: any;
  // columns to be shown in UI
  displayedColumns: string[] = [
    'districtName',
    'population',
    'confirmed',
    'deltaConfirmed',
    'recovered',
    'deltaRecovered',
    'deceased',
    'deltaDeceased',
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public districtData: any) {
    this.trasformData(districtData);
  }

  // initialising sort and paging
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // logic to trasform data
  trasformData(districtData) {
    this.disData = [];
    for (var key in districtData) {
      var obj = {
        districtName: key,
        population: this.nullCheck(districtData[key].meta?.population),
        confirmed: this.nullCheck(districtData[key].total.confirmed),
        deltaConfirmed: this.nullCheck(districtData[key].delta?.confirmed),
        recovered: this.nullCheck(districtData[key].total.recovered),
        deltaRecovered: this.nullCheck(districtData[key].delta?.recovered),
        deceased: this.nullCheck(districtData[key].total.deceased),
        deltaDeceased: this.nullCheck(districtData[key].delta?.deceased),
      };
      this.disData.push(obj);
    }
    this.dataSource = new MatTableDataSource(this.disData);
  }

  // search filter on keypress
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  // checking null
  nullCheck(val: any): number {
    return val == undefined ? 0 : val;
  }
}
