import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private states: any = [  
    {  
      "key": "AN",  
      "name": "Andaman and Nicobar Islands"  
    },  
    {  
      "key": "AP",  
      "name": "Andhra Pradesh"  
    },  
    {  
      "key": "AR",  
      "name": "Arunachal Pradesh"  
    },  
    {  
      "key": "AS",  
      "name": "Assam"  
    },  
    {  
      "key": "BR",  
      "name": "Bihar"  
    },  
    {  
      "key": "CH",  
      "name": "Chandigarh"  
    },  
    {  
      "key": "CT",  
      "name": "Chhattisgarh"  
    },  
    {  
      "key": "DN",  
      "name": "Dadra and Nagar Haveli"  
    },  
    {  
      "key": "DL",  
      "name": "Delhi"  
    },  
    {  
      "key": "GA",  
      "name": "Goa"  
    },  
    {  
      "key": "GJ",  
      "name": "Gujarat"  
    },  
    {  
      "key": "HR",  
      "name": "Haryana"  
    },  
    {  
      "key": "HP",  
      "name": "Himachal Pradesh"  
    },  
    {  
      "key": "JK",  
      "name": "Jammu and Kashmir"  
    },  
    {  
      "key": "JH",  
      "name": "Jharkhand"  
    },  
    {  
      "key": "KA",  
      "name": "Karnataka"  
    },  
    {  
      "key": "KL",  
      "name": "Kerala"  
    },  
    {  
      "key": "LA",  
      "name": "Ladakh"  
    },  
    {  
      "key": "LD",  
      "name": "Lakshadweep"  
    },  
    {  
      "key": "MP",  
      "name": "Madhya Pradesh"  
    },  
    {  
      "key": "MH",  
      "name": "Maharashtra"  
    },  
    {  
      "key": "MN",  
      "name": "Manipur"  
    },  
    {  
      "key": "ML",  
      "name": "Meghalaya"  
    },  
    {  
      "key": "MZ",  
      "name": "Mizoram"  
    },  
    {  
      "key": "NL",  
      "name": "Nagaland"  
    },  
    {  
      "key": "OR",  
      "name": "Odisha"  
    },  
    {  
      "key": "PY",  
      "name": "Puducherry"  
    },  
    {  
      "key": "PB",  
      "name": "Punjab"  
    },  
    {  
      "key": "RJ",  
      "name": "Rajasthan"  
    },  
    {  
      "key": "SK",  
      "name": "Sikkim"  
    },  
    {  
      "key": "TN",  
      "name": "Tamil Nadu"  
    },  
    {  
      "key": "TG",  
      "name": "Telangana"  
    },  
    {  
      "key": "TR",  
      "name": "Tripura"  
    },  
    {  
      "key": "UP",  
      "name": "Uttar Pradesh"  
    },  
    {  
      "key": "UT",  
      "name": "Uttarakhand"  
    },  
    {  
      "key": "WB",  
      "name": "West Bengal"  
    },
    {  
      "key": "TT",  
      "name": "India Summary"  
    }   
  ]  

  getStateData(date: string): Observable<any> {
    let url = `https://api.covid19india.org/v4/min/data${date}.min.json`  
    return this.http.get(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  getStates(): any {  
    return this.states;  
  } 
}
