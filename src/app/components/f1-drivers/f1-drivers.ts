import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { F1DriverService } from '../../services/f1-driver.service';
import { Driver } from '../../model/driverInterface';

@Component({
  selector: 'app-f1-drivers',
  imports: [],
  templateUrl: './f1-drivers.html'
})
export class F1DriversComponent implements OnInit {

  private f1DriverService = inject(F1DriverService);
  
  drivers = signal<Driver[]>([]);
  selectedDriver = signal<Driver | null>(null);

  uniqueDrivers = computed(() => {
    const driversArray = this.drivers();
    const uniqueMap = new Map<string, Driver>();
    
    driversArray.forEach(driver => {
      if (driver.full_name && !uniqueMap.has(driver.full_name)) {
        uniqueMap.set(driver.full_name, driver);
      }
    });
    
    return Array.from(uniqueMap.values()).sort((a, b) => 
      a.full_name.localeCompare(b.full_name)
    );
  });

  ngOnInit() {
    this.getF1Drivers();
  }

  getF1Drivers() {
    this.f1DriverService.getAllDrivers().subscribe({
      next: (drivers: Driver[]) => {
        this.drivers.set(drivers);
      },
    });
  }

  verDatosPiloto(driver: Driver) {
    if (this.selectedDriver() && this.selectedDriver()?.full_name === driver.full_name) {
      this.selectedDriver.set(null);
    } else {
      this.selectedDriver.set(driver);
    }
  }
}