
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudsService {

  jsonurl:string;
  constructor( private http:HttpClient) { 

    // this.dumyjsonurl='http://localhost:3000/Heads';  
    this.jsonurl='http://localhost:3000/Head';
  }

//=============HEADER USING ANGULER (AUTHORIZATION & AUTHENICATION)=============//
 httpHeaders = new HttpHeaders(
  {
    'content-type' : 'application/json',
    'Authorization' : 'Dhruv',
    'settimeout' : '10'
  }
 )

  getTask(){
      let time = this.httpHeaders.get('settimeout');
      let counter=0;

      setInterval(()=>{
      counter +=1;
        if(time === counter.toString()){
          this.httpHeaders = this.httpHeaders.set('Authorization', 'Gorasiya');
          console.log( this.httpHeaders.get('Authorization')); 
        }else{
          console.log( this.httpHeaders.get('Authorization')); 
        }
      },1000);
    return this.http.get(this.jsonurl,{headers:this.httpHeaders});
   }
//=============HEADER END=============//


//=============ADD SERVICE METHOD=============//
addTask(body:Header){
  return this.http.post(this.jsonurl,{'taskName':body.taskName});
}
//=============EDIT SERVICE METHOD=============//
editTask(body:Header){
  return this.http.put(this.jsonurl+"/"+body.id,body);
}
//=============DELETE SERVICE METHOD=============//
   deleteTask(body:any){
    return this.http.delete(this.jsonurl+"/"+body)
   }
}


export class Header{
  taskName!:string;
  id!:number;
}
