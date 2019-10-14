import { Component, OnInit } from '@angular/core';
import { AppComponentService } from '../app-component.service';
import { IBankData } from '../app.interface';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CITIES, DEFAULT_PAGE_SIZE } from './bank-grid.constant';

@Component({
  selector: 'app-bank-grid',
  templateUrl: './bank-grid.component.html',
  styleUrls: ['./bank-grid.component.scss']
})
export class BankGridComponent implements OnInit {
  public title = 'BankFinder';
  public bankDataMaster: IBankData[] = [];
  public bankData: IBankData[] = [];
  public cities: string[] = CITIES;
  public selectedCity: string = this.cities[0];
  public cityDropDownOpen: boolean;
  public isLoading: boolean;
  public pageSize = DEFAULT_PAGE_SIZE;
  public pageIndex = 1;
  public searchKeyWord: string;
  public favourites: IBankData[] = [];
  public ifscCodesInFavourites: string[];

  constructor(
    private appComponentService: AppComponentService,
    private router: Router) { }

  public ngOnInit() {
    this.isLoading = true;
    this.loadCity();
    this.favourites = this.appComponentService.getFavourites();
    this.ifscCodesInFavourites = this.appComponentService.ifscCodesInFavourites;
  }
  public toggleDropDown() {
    this.cityDropDownOpen = !this.cityDropDownOpen;
  }
  public changeCity(city: string) {
    if (this.selectedCity !== city && !this.isLoading) {
      this.selectedCity = city;
      this.pageIndex = 1;
      this.bankData = [];
      this.bankDataMaster = [];
      this.loadCity();
    }
    this.toggleDropDown();
  }

  private loadCity() {
    this.isLoading = true;
    this.appComponentService.getBank(this.selectedCity).pipe(take(1)).subscribe((data: IBankData[]) => {
      this.bankDataMaster = data;
      this.buildGrid();
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
      this.bankData = [];
    });
  }

  private buildGrid() {
    const filterFields = ['bank_name', 'branch', 'ifsc', 'address'];
    this.bankData = [...this.bankDataMaster];
    if (this.searchKeyWord) {
      this.bankData = this.bankData.filter((bankDataRow: IBankData) => {
        let rowUnderFilter = false;
        for (const key of filterFields) {
          if (String(bankDataRow[key]).toLowerCase().includes(String(this.searchKeyWord).trim().toLowerCase())) {
            rowUnderFilter = true;
            break;
          }
        }
        return rowUnderFilter;
      });
    }

    this.bankData = this.bankData.slice(
      (this.pageIndex - 1) * this.pageSize, ((this.pageIndex - 1) * this.pageSize) + this.pageSize);
  }

  public decrementIndex() {
    this.pageIndex -= 1;
    this.buildGrid();
  }

  public incrementIndex() {
    this.pageIndex += 1;
    this.buildGrid();
  }
  public changePageSize(event: string) {
    this.pageSize = Number(event);
    this.pageIndex = 1;
    this.buildGrid();
  }

  public searchBankData(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.pageIndex = 1;
      this.buildGrid();
    }
  }

  public manageFavourites(event: MouseEvent, bank: IBankData) {
    event.stopPropagation();
    this.appComponentService.setFavourites(bank);
    this.ifscCodesInFavourites = this.appComponentService.ifscCodesInFavourites;
  }

  public openBankPage(id: number) {
    this.router.navigate([`banks/${id}`]);
  }

}
