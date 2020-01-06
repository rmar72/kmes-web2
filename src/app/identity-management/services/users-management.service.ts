import { Injectable } from '@angular/core';
import { ResourceService, Resource } from 'src/app/shared/services/resource.service';
import { HttpClient } from '@angular/common/http';
import { NopSerializer } from 'src/app/shared/helpers/serializers';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService extends ResourceService<any> {

  constructor(http: HttpClient) {
    super(
      http,
      'users',
      '1.1.0',
      'users',
    );
  }

  public getUsersPaged(page, pageCount) {
    // return this.http.get(`${this.url}?page=${page}&pageCount=${pageCount}`)
    // .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }
}

export interface CreateUser extends Resource {
  username?: string;
  primaryGroup?: string;
  subGroups?: string[];
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    commonName?: string;
    surname?: string;
    mobileCarrier?: string;
    phone?: string;
    email?: string;
  };
  newPassword?: string;
}

export const Carriers = [
  'Alltel',
  'AT&T',
  'Boost Mobile',
  'Xfinity Mobile',
  'Sprint',
  'T-Mobile',
  'Tracfone',
  'Verizon',
  'Virgin Mobile',
  'Rogers (Canada)',
  'Vodacom (South Africa)',
  'MTN Group (South Africa)'
];
