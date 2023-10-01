import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, filter, from, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage:Storage | undefined;
  private storageReady = new BehaviorSubject(false);

  constructor(
    private storage:Storage,
    private router:Router,
  ) { 
    this.init();
  }

   init(){
     this.storage.defineDriver(CordovaSQLiteDriver);
     this.storage.create();
    // const storage = await this.storage.create();
    this._storage = this.storage;
  }

  public set(key:string, value:any){
    this._storage?.set(key,value);
    return true;
  }

  public async get(key:string){
    const value =  await this._storage?.get(key);
    return value;
  }

  public async clear(){
    await this._storage?.clear();
  }

}
