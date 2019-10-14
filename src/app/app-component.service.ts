import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IBankData } from './app.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {
  public bankCache = new Map<string, IBankData[]>();
  public favourites: IBankData[] = [];
  public ifscCodesInFavourites: string[] = [];

  constructor(private http: HttpClient) {
    const favourites = localStorage.getItem('bankFavourites');
    if (favourites) {
      this.favourites = JSON.parse(favourites);
      this.buildFavouriteIFSCodes();
    }
  }

  public getBank(city: string): Observable<IBankData[]> {
    const cityCache = this.bankCache.get(city);
    if (cityCache) {
      return of(cityCache);
    }
    return this.http.get(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`).pipe(
      map((data: IBankData[]) => {
        this.bankCache.set(city, data);
        return data;
      })
    ) as Observable<IBankData[]>;
  }

  public getFavourites(): IBankData[] {
    return this.favourites;
  }

  public setFavourites(bank: IBankData) {
    if (!this.ifscCodesInFavourites.includes(bank.ifsc)) {
      this.favourites.push(bank);
    } else {
      this.favourites.splice(this.favourites.findIndex(favBank => favBank.ifsc === bank.ifsc), 1);
    }
    this.buildFavouriteIFSCodes();
    localStorage.setItem('bankFavourites', JSON.stringify(this.favourites));
  }

  public buildFavouriteIFSCodes() {
    this.ifscCodesInFavourites = this.favourites.map((data: IBankData) => data.ifsc);
  }
}
