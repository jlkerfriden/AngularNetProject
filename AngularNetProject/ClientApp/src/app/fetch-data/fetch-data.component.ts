import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { WeatherForecast } from '../_interfaces/model/weather-forecast';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(private httpService: HttpService) {
    httpService.get<WeatherForecast[]>('weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}
