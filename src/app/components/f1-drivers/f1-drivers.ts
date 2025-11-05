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
    console.log('F1DriversComponent initialized');
    this.getF1Drivers();
  }

  getF1Drivers() {
    console.log('Calling F1 API...');
    this.f1DriverService.getAllDrivers().subscribe({
      next: (drivers: Driver[]) => {
        console.log('F1 Drivers loaded:', drivers);
        console.log('Number of drivers:', drivers.length);
        this.drivers.set(drivers);
        console.log('Unique drivers:', this.uniqueDrivers());
      },
      error: (err) => {
        console.error('Error loading F1 drivers:', err);
        // Agregar datos de prueba si falla la API
        const testDrivers: Driver[] = [
          { full_name: 'Lewis Hamilton', team_name: 'Mercedes', driver_number: 44 },
          { full_name: 'Max Verstappen', team_name: 'Red Bull Racing', driver_number: 1 },
          { full_name: 'Charles Leclerc', team_name: 'Ferrari', driver_number: 16 },
          { full_name: 'Carlos Sainz', team_name: 'Ferrari', driver_number: 55 },
          { full_name: 'Lando Norris', team_name: 'McLaren', driver_number: 4 },
          { full_name: 'Oscar Piastri', team_name: 'McLaren', driver_number: 81 },
          { full_name: 'George Russell', team_name: 'Mercedes', driver_number: 63 },
          { full_name: 'Sergio Pérez', team_name: 'Red Bull Racing', driver_number: 11 },
          { full_name: 'Fernando Alonso', team_name: 'Aston Martin', driver_number: 14 },
          { full_name: 'Lance Stroll', team_name: 'Aston Martin', driver_number: 18 },
          { full_name: 'Esteban Ocon', team_name: 'Alpine', driver_number: 31 },
          { full_name: 'Pierre Gasly', team_name: 'Alpine', driver_number: 10 },
          { full_name: 'Alexander Albon', team_name: 'Williams', driver_number: 23 },
          { full_name: 'Logan Sargeant', team_name: 'Williams', driver_number: 2 },
          { full_name: 'Valtteri Bottas', team_name: 'Alfa Romeo', driver_number: 77 },
          { full_name: 'Zhou Guanyu', team_name: 'Alfa Romeo', driver_number: 24 },
          { full_name: 'Kevin Magnussen', team_name: 'Haas', driver_number: 20 },
          { full_name: 'Nico Hülkenberg', team_name: 'Haas', driver_number: 27 },
          { full_name: 'Yuki Tsunoda', team_name: 'AlphaTauri', driver_number: 22 },
          { full_name: 'Daniel Ricciardo', team_name: 'AlphaTauri', driver_number: 3 }
        ];
        console.log('Using test data:', testDrivers);
        this.drivers.set(testDrivers);
      }
    });
  }

  verDatosPiloto(driver: Driver) {
    console.log("Datos del piloto F1...", driver);
    // Toggle: si ya está seleccionado el mismo piloto, lo deselecciona
    if (this.selectedDriver() && this.selectedDriver()?.full_name === driver.full_name) {
      this.selectedDriver.set(null);
    } else {
      // Si no está seleccionado o es otro piloto, lo selecciona
      this.selectedDriver.set(driver);
    }
  }
}