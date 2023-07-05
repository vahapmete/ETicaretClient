import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom,Observable } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/base_url';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService:HttpClientService) { }

  async getBaseStorageUrl():Promise<BaseUrl>{
    const observable:Observable<BaseUrl> =this.httpClientService.get<BaseUrl>({
        controller:"files",
        action:"getBaseStorageUrl"
    });
   return await firstValueFrom(observable)
  } 
}