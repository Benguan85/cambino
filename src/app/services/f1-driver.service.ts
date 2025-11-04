import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../model/driverInterface';

@Injectable({
  providedIn: 'root'
})
export class F1DriverService {
  
  private http = inject(HttpClient);
  private apiUrl = 'https://api.openf1.org/v1/drivers';

  getAllDrivers(sessionKey: number = 9158): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}?session_key=${sessionKey}`);
  }

  getDriverByNumber(driverNumber: number, sessionKey: number = 9158): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}?driver_number=${driverNumber}&session_key=${sessionKey}`);
  }

  getUniqueDrivers(sessionKey: number = 9158): Observable<Driver[]> {
    return this.getAllDrivers(sessionKey);
  }
}