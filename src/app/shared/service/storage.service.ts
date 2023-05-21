import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
 
  static setItem(key: string, data: string): string {
    localStorage.setItem(key, data);
    return data;
  }

  static getItem(key: string): string {
    const data = localStorage.getItem(key);
    // @ts-ignore
    return data;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  constructor() {
    if (typeof Storage === 'undefined') {
      throw new Error('StorageService: Local storage is not supported');
    }
  }
}
