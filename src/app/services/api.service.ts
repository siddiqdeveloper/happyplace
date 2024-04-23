import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

let head = new HttpHeaders();
let headers = head.set("Accept", "application/json");

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiURL = "https://myhappyplays.com/api";
  //

  // apiURL = 'http://192.168.0.54:8001/api'

  constructor(private http: HttpClient) {}

  public getData(url, params: any = "") {
    this.getToken();
    if (params) {
      return this.http.get<any>(`${this.apiURL}/` + url + `/` + params, {
        headers,
      });
    }
    return this.http.get<any>(`${this.apiURL}/` + url, { headers });
  }

  public postData(data, url) {
    this.getToken();
    return this.http.post<any>(`${this.apiURL}/` + url, data, { headers });
  }

  public searchData(url, params: any = "") {
    this.getToken();
    params = params === "" ? null : params;
    return this.http.get<any>(`${this.apiURL}/` + url + `/` + params, {
      headers,
    });
  }

  public index(params) {
    this.getToken();
    return this.http.get<any>(`${this.apiURL}/` + params, { headers });
  }

  public getProductList() {
    this.getToken();
    return this.http.get<any>(`${this.apiURL}/` + "product", { headers });
  }

  public getProductAgeList() {
    this.getToken();
    return this.http.get<any>(`${this.apiURL}/` + "productlist/age", {
      headers,
    });
  }

  public bestdealUpdateproductget() {
    this.getToken();
    return this.http.get<any>(`${this.apiURL}/` + "bestdealUpdateproductget", {
      headers,
    });
  }

  public bestdealUpdateproductDelete(data) {
    return this.http.post<any>(
      `${this.apiURL}/` + "bestdealUpdateproductDelete",
      data,
      { headers }
    );
  }

  public updatePassword(data) {
    return this.http.post<any>(`${this.apiURL}/` + "updatePassword", data, {
      headers,
    });
  }

  public imageosorting(data) {
    return this.http.post<any>(`${this.apiURL}/` + "imageosorting", data, {
      headers,
    });
  }

  public updatesort(data) {
    return this.http.post<any>(`${this.apiURL}/` + "updatesort", data, {
      headers,
    });
  }

  public bestdealUpdateproduct(data) {
    this.getToken();
    return this.http.post<any>(
      `${this.apiURL}/` + "bestdealUpdateproduct",
      data,
      { headers }
    );
  }

  public ageUpdateproduct(data) {
    this.getToken();
    return this.http.post<any>(`${this.apiURL}/` + "ageUpdateproduct", data, {
      headers,
    });
  }

  public ageUpdateproductget() {
    this.getToken();
    return this.http.get<any>(`${this.apiURL}/` + "ageUpdateproductget", {
      headers,
    });
  }

  public ageUpdateproductDelete(data) {
    return this.http.post<any>(
      `${this.apiURL}/` + "ageUpdateproductDelete",
      data,
      { headers }
    );
  }

  public store(params, data) {
    return this.http.post<any>(`${this.apiURL}/` + params, data, { headers });
  }

  public show(params) {
    return this.http.get<any>(`${this.apiURL}/` + params, { headers });
  }

  public update(params, data) {
    return this.http.post<any>(
      `${this.apiURL}/` + params + "?_method=PUT",
      data,
      { headers }
    );
  }

  public update2(params, data) {
    return this.http.put<any>(`${this.apiURL}/` + params, data, { headers });
  }

  public destroy(params) {
    return this.http.delete<any>(`${this.apiURL}/` + params, { headers });
  }

  private getToken() {
    headers = head.set(
      "Authorization",
      `Bearer ${localStorage.getItem("user_token")}`
    );
  }
}
