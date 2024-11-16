import { Injectable } from '@angular/core';


@Injectable()
export class LanguageService {


    FirstDayWeek = {
        ES : 1,
        EN : 0,
    }

    today = {
        ES : {des : 'Hoy'},
        EN : {des : 'Today'},
    }


    daysName = {
        ES : [
            {id : 1 , des :'Lunes', cor : 'Lu'},
            {id : 2 , des :'Martes', cor : 'Ma'},
            {id : 3 , des :'Miércoles', cor : 'Mi'},
            {id : 4 , des :'Jueves', cor : 'Ju'},
            {id : 5 , des :'Viernes', cor : 'Vi'},
            {id : 6 , des :'Sábado', cor : 'Sa'},
            {id : 0 , des :'Domingo', cor : 'Do'},
        ],
        EN:[
            {id : 0 , des :'Sunday', cor : 'Su'},
            {id : 1 , des :'Monday', cor : 'Mo'},
            {id : 2 , des :'Tuesday', cor : 'Tu'},
            {id : 3 , des :'Wednesday', cor : 'We'},
            {id : 4 , des :'Thursday', cor : 'Th'},
            {id : 5 , des :'Friday', cor : 'Fr'},
            {id : 6 , des :'Saturday', cor : 'Sa'},
            
        ]
    }


    MonthsName = {
        ES : [
            {id : 0 , des :'Enero', cor : 'Ene'},
            {id : 1 , des :'Febrero', cor : 'Feb'},
            {id : 2 , des :'Marzo', cor : 'Mar'},
            {id : 3 , des :'Abril', cor : 'Abr'},
            {id : 4 , des :'Mayo', cor : 'May'},
            {id : 5 , des :'Junio', cor : 'Jun'},
            {id : 6 , des :'Julio', cor : 'Jul'},
            {id : 7 , des :'Agosto', cor : 'Ago'},
            {id : 8 , des :'Septiembre', cor : 'Sep'},
            {id : 9 , des :'Octubre', cor : 'Oct'},
            {id : 10 , des :'Noviembre', cor : 'nov'},
            {id : 11 , des :'Diciembre', cor : 'Dic'},
           
        ],
        EN:[
            {id : 0 , des :'January', cor : 'Jan'},
            {id : 1 , des :'February', cor : 'Feb'},
            {id : 2 , des :'March', cor : 'Mar'},
            {id : 3 , des :'April', cor : 'Apr'},
            {id : 4 , des :'May', cor : 'May'},
            {id : 5 , des :'June', cor : 'Jun'},
            {id : 6 , des :'July', cor : 'Jul'},
            {id : 7 , des :'August', cor : 'Aug'},
            {id : 8 , des :'September', cor : 'Sep'},
            {id : 9 , des :'October', cor : 'Oct'},
            {id : 10 , des :'November', cor : 'Nov'},
            {id : 11 , des :'December', cor : 'Dec'},
        ]
    }



    constructor(
    ) {

  }

  

}