import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MuruganApp1';

  date: Date;
  selectedOption: string;
  stateData: any;
  stateList: any;
  districtData: any;
  stateName: string;
  indiaSummaryData: StateDataStructure;
  consolidatedData: Array<StateDataStructure>;
  stateNameData: Array<StateDataStructure>;
  populationData: Array<StateDataStructure>;
  totalTestData: Array<StateDataStructure>;
  totalConfirmedData: Array<StateDataStructure>;
  deltaConfirmedData:Array<StateDataStructure>;
  totalRecoveredData: Array<StateDataStructure>;
  totalDeceasedData: Array<StateDataStructure>;
  totalPercentageData: Array<StateDataStructure>;
  deltaPercentageData:Array<StateDataStructure>;
  displayData: Array<StateDataStructure>;

  constructor(private service: DataService, private datepipe: DatePipe,) { }

  ngOnInit() {
    this.selectedOption = 'name';
    this.date = new Date();
    this.getStateData('');
    this.getStates();
  }

  postDateFilter = (dt: Date): boolean => {
    return dt <= new Date() && dt > new Date('2020-03-01');
  }

  dateChanged() {
    this.selectedOption = 'name';
    this.districtData = undefined;
    if (this.date > new Date()) {
      this.getStateData('');
    }
    else if (this.datepipe.transform(this.date, 'yyyy-MM-dd') == this.datepipe.transform(new Date(), 'yyyy-MM-dd')) {
      this.getStateData('');
    }
    else {
      this.getStateData(this.datepipe.transform(this.date, 'yyyy-MM-dd'));
    }
  }

  getStateData(date: string) {
    let value = (date == '') ? '' : '-' + date;
    this.service.getStateData(value).subscribe(
      response => {
        this.stateData = response;
        this.compileData();
      }, error => {
        this.date = new Date();
        this.getStateData('');
      }
    );
  }

  compileData() {
    this.consolidatedData = new Array<StateDataStructure>();
    this.stateList.forEach(element => {
      let data = this.stateData[element.key];
      let test = (data?.total?.tested == undefined) ? 0 : data?.total?.tested;
      let conf = (data?.total?.confirmed == undefined) ? 0 : data?.total?.confirmed;
      let per = Math.round((test == 0) ? 0 : conf / test * 100);
      let deltaTest = (data?.delta?.tested == undefined) ? 0 : data?.delta?.tested;
      let deltaConf = (data?.delta?.confirmed == undefined) ? 0 : data?.delta?.confirmed;
      let deltaPer = Math.round((deltaTest == 0) ? 0 : deltaConf / deltaTest * 100);
      this.consolidatedData.push({
        stateCode: element.key,
        stateName: element.name,
        population: (data?.meta?.population == undefined) ? 0 : data?.meta?.population,
        tested: (data?.total?.tested == undefined) ? 0 : data?.total?.tested,
        deltaTested: (data?.delta?.tested == undefined) ? 0 : data?.delta?.tested,
        confirmed: (data?.total?.confirmed == undefined) ? 0 : data?.total?.confirmed,
        deltaConfirmed: (data?.delta?.confirmed == undefined) ? 0 : data?.delta?.confirmed,
        percentage: per,
        deltaPercentage: deltaPer,
        recovered: (data?.total?.recovered == undefined) ? 0 : data?.total?.recovered,
        deltaRecovered: (data?.delta?.recovered == undefined) ? 0 : data?.delta?.recovered,
        deceased: (data?.total?.deceased == undefined) ? 0 : data?.total?.deceased,
        deltaDeceased: (data?.delta?.deceased == undefined) ? 0 : data?.delta?.deceased,
      });
    });
    this.indiaSummaryData = this.consolidatedData.find(x => x.stateCode == 'TT');
    let test = (this.indiaSummaryData.tested == undefined) ? 0 : this.indiaSummaryData.tested;
    let conf = (this.indiaSummaryData.confirmed == undefined) ? 0 : this.indiaSummaryData.confirmed;
    let per = Math.round((test == 0) ? 0 : conf / test * 100);
    let deltaTest = (this.indiaSummaryData.deltaTested == undefined) ? 0 : this.indiaSummaryData.deltaTested;
    let deltaConf = (this.indiaSummaryData.deltaConfirmed == undefined) ? 0 : this.indiaSummaryData.deltaConfirmed;
    let deltaPer = Math.round((deltaTest == 0) ? 0 : deltaConf / deltaTest * 100);
    this.indiaSummaryData.percentage = per;
    this.indiaSummaryData.deltaPercentage = deltaPer;
    this.stateNameData = this.consolidatedData.filter(x => x.stateCode != 'TT');
    let data1 = JSON.parse(JSON.stringify(this.stateNameData)) as StateDataStructure[];
    let data2 = JSON.parse(JSON.stringify(this.stateNameData)) as StateDataStructure[];
    let data3 = JSON.parse(JSON.stringify(this.stateNameData)) as StateDataStructure[];
    let data4 = JSON.parse(JSON.stringify(this.stateNameData)) as StateDataStructure[];
    let data5 = JSON.parse(JSON.stringify(this.stateNameData)) as StateDataStructure[];
    let data6 = JSON.parse(JSON.stringify(this.stateNameData)) as StateDataStructure[];
    let data7 = JSON.parse(JSON.stringify(this.stateNameData)) as StateDataStructure[];
    let data8 = JSON.parse(JSON.stringify(this.stateNameData)) as StateDataStructure[];
    this.populationData = data1.sort((a, b) => b.population - a.population);
    this.totalTestData = data2.sort((a, b) => b.tested - a.tested);
    this.totalConfirmedData = data3.sort((a, b) => b.confirmed - a.confirmed);
    this.totalRecoveredData = data4.sort((a, b) => b.recovered - a.recovered);
    this.totalDeceasedData = data5.sort((a, b) => b.deceased - a.deceased);
    this.deltaConfirmedData = data6.sort((a, b) => b.deltaConfirmed - a.deltaConfirmed);
    this.totalPercentageData = data7.sort((a, b) => b.percentage - a.percentage);
    this.deltaPercentageData = data8.sort((a, b) => b.deltaPercentage - a.deltaPercentage);
    this.displayData = this.stateNameData;
  }

  onOptionChanged() {
    switch (this.selectedOption) {
      case 'name': {
        this.displayData = this.stateNameData;
        break;
      }
      case 'population': {
        this.displayData = this.populationData;
        break;
      }
      case 'test': {
        this.displayData = this.totalTestData;
        break;
      }
      case 'confirmed': {
        this.displayData = this.totalConfirmedData;
        break;
      }
      case 'deltaConfirmed': {
        this.displayData = this.deltaConfirmedData;
        break;
      }
      case 'recovered': {
        this.displayData = this.totalRecoveredData;
        break;
      }
      case 'deceased': {
        this.displayData = this.totalDeceasedData;
        break;
      }
      case 'percentage': {
        this.displayData = this.totalPercentageData;
        break;
      }
      case 'deltaPercentage': {
        this.displayData = this.deltaPercentageData;
        break;
      }
      default: {
        this.displayData = this.stateNameData;
        break;
      }
    }
  }

  getStates() {
    this.stateList = this.service.getStates();
  }

  getStateName(stateCode: string) {
    return this.stateList.find(x => x.key == stateCode).name;
  }

  selectState(stateCode: string) {
    this.districtData = this.stateData[stateCode]?.districts;
    this.stateName = this.stateList.find(x => x.key == stateCode).name;
  }

  back() {
    this.districtData = undefined;
  }

  nullCheck(val: any): number {
    return (val == undefined) ? 0 : val;
  }
}

export class StateDataStructure {
  stateCode: string;
  stateName: string;
  population: number;
  tested: number;
  deltaTested: number;
  confirmed: number;
  deltaConfirmed: number;
  percentage: number;
  deltaPercentage: number;
  recovered: number;
  deltaRecovered: number;
  deceased: number;
  deltaDeceased: number;
}