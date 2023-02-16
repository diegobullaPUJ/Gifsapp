import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse, Images, DownsizedSmall } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private UrlService: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '2O3kQT2HegyUuxu0jZvocGpR3igDYClq';
  private _record: string [] = [];
  
  public results: Gif [] = [];

  get record(){
    return [...this._record];
  }



  constructor( private http: HttpClient){

    // if(localStorage.getItem('record')) {
      //   this._record = JSON.parse( localStorage.getItem('record')! ) ;  
      // }

  this._record = JSON.parse(localStorage.getItem('record')!) || []
  this.results = JSON.parse(localStorage.getItem('results')!) || []

  }

  searchGifs( query:string = '' ){

    query = query.trim().toLocaleLowerCase();

    if( !this._record.includes( query ) ){
      this._record.unshift( query );
      this._record = this._record.splice(0,10);
      
      localStorage.setItem('record', JSON.stringify( this._record )  );
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '20')
    .set('q', query);


    this.http.get<SearchGifsResponse>( `${ this.UrlService }/search`, { params } )
      .subscribe( ( resp ) =>  {
        console.log( resp.data );
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify( this.results )  );
      })

  }

}
