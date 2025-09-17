import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';



export interface Admin {
    firstname?: string;
    lastname?: string;
    loginid?: string;
    email?: string;
   
}

@Injectable()
export class ManageAdminsService {
    
  private url :string;
  constructor(private http: HttpClient , private _url : UrlService) {
    this.url = `${this._url.getApiUrl()}`
  }

  getAdmins() {
    return this.http.get(`${this.url}users/getallusers`);
  }
   

    

   

    

    
}
