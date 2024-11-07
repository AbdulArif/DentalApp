import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuGroup } from 'src/app/models/menu/menu.model';
import { AuthMenuGroup } from 'src/app/models/menu/user-auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  GetAvailableMenus(): Observable<MenuGroup[]> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.get<MenuGroup[]>(`${environment.apiUrl}/api/Menu/GetAvailableMenus`, options);
  }
  GetUserMenus(ClinicId: string, UserId: string): Observable<MenuGroup[]> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
        .append('UserId', UserId)
        .append('ClinicId', ClinicId)
    }
    return this.http.get<MenuGroup[]>(`${environment.apiUrl}/api/Menu/GetUserMenus`, options);
  }
  UserAuthorization(model: AuthMenuGroup[]): Observable<any> {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
      params: new HttpParams()
    }
    return this.http.post<any>(`${environment.apiUrl}/api/Menu/UserAuthorization`, model, options);
  }
}
