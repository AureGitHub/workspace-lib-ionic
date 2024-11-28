import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LanguageService } from './languaje.service';

@Component({
  selector: 'my-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {


  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  @ViewChild('slider') slider: any;  

  @Output() refreshEnvents = new EventEmitter<any>();

  @Output() refreshSelectedDate = new EventEmitter<any>();

  @Output() getDateSelected = new EventEmitter<any>();

  

  @Input()  lan : string;
  @Input()  disabled =false;

  
  TodayDesc: any;
  lstEventos: any;

  @Input() set eventSource(value) {

    this.lstEventos = value;
    this.setEventosInCalendar();
  }

  // Fecha seleccionada
  dateSelected : Date = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());

  // Fecha que utilizo para hacer el calendario (DIFERENTE A LA SELECCIOANDA)
  dateParaMontarCalendar  : Date = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());

  today = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());

  

  //Lista de meses para el combo
  months = [];
  // Lista de años para el combo
  Years = [];


  //Mes actual. En número. indexado a partir del 0
  currentMonth : number = new Date().getMonth();
  
  //Año actual. En número
  currentYear : number = new Date().getFullYear();
  
  // Lista de objetos que contienen los días del mes
  lstDiasMesinWeek = [];
  days: any;


  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.setlanguaje();
    this.Setyears();
    this.getDiasMes();
    this.refreshEnvents.emit(this.dateParaMontarCalendar);
    this.refreshSelectedDate.emit(this.dateSelected);

    this.TodayDesc = this.languageService['today'][this.lan]['des'];

  }


  changeDate(op,cual){
    if(cual=='month'){
      if(op=='add'){
        this.dateParaMontarCalendar.setMonth(this.dateParaMontarCalendar.getMonth() + 1);
      }
      else if(op=='sub'){
        this.dateParaMontarCalendar.setMonth(this.dateParaMontarCalendar.getMonth() - 1);
      }
      
      
    }
    else if(cual=='year'){

      if(op=='add'){
        this.dateParaMontarCalendar.setFullYear(this.dateParaMontarCalendar.getFullYear() + 1);
      }
      else if(op=='sub'){
        this.dateParaMontarCalendar.setFullYear(this.dateParaMontarCalendar.getFullYear() - 1);
      }
    }

    this.currentMonth = this.dateParaMontarCalendar.getMonth();
    this.currentYear = this.dateParaMontarCalendar.getFullYear();

    this.dateSelected = null;

    // this.refreshSelectedDate.emit(this.dateSelected);
    
      this.refreshEnvents.emit(this.dateParaMontarCalendar);
      this.getDiasMes();


  }

  async sliderChanges()
  {

    const index = await this.slider.getActiveIndex();
    if(index==2){
      this.changeDate('add','month');
    }else 
    if(index==0){
      this.changeDate('sub','month');
    }
    this.slider.slideTo(1);
    // this.changeDate('add','month')
  }


  inicializaDias(){
    for(let i=0; i<this.lstDiasMesinWeek.length; i++){
      for(let j=0; j<this.lstDiasMesinWeek[i].length; j++){
        if(this.lstDiasMesinWeek[i][j]?.fecha){
          this.lstDiasMesinWeek[i][j].eventos = [];
        }
      }
    }

    
  }

  getDayFromCalendarFormated(eventofecha : any){

    const anno = Number(eventofecha.split('-')[0]);
    const month = Number(eventofecha.split('-')[1])-1;
    const day = Number(eventofecha.split('-')[2]);
    const fecha = new Date(anno,month,day);


    for(let i=0; i<this.lstDiasMesinWeek.length; i++){
      const week = this.lstDiasMesinWeek[i];
      const dayFinded =  week.find(a=> a?.fecha && a.fecha.getTime() == fecha.getTime());
      if(dayFinded){
        return dayFinded;
      }
    }


    return null;

  }


  setEventosInCalendar() {

    if(!this.lstEventos) return;

    this.inicializaDias();

    this.lstEventos.forEach(evento => {

      //encuentro el día del evento
      let dia = this.getDayFromCalendarFormated(evento.fecha);
      if(dia){

        dia.esturno = dia.esturno || evento?.esturno;

        if(evento?.esturno){
          dia.bkcolor =  evento?.bkcolor;
        }
        else{
          if(!dia?.eventos){
            dia.eventos = [];
          }
          dia.eventos.push(evento?.color);
        }
      }
      
    });



    // if(value){
    //   this.lstDiasMesinWeek.forEach(week=>{

    //     week.forEach(day => {

    //       day.bkcolor = value?.bkcolor;

    //       if(day.fecha){
    //         day.bkcolor = value[0].bkcolor;
    //         const evento = value.find(a=> a.fecha.getTime() == day.fecha );
    //       }

              
    //       if(day.fecha){
    //         day.TotalComidas = value.filter(a=> {      
    //           if(a.fecha.getTime() === day.fecha.getTime()){        
    //             return true;      
    //           }      
    //           return false;
      
    //         }).length;


    //         day.TotalCenas = value.filter(a=> a.servicio=='cena').filter(a=> {      
    //           if(a.fecha.getTime() === day.fecha.getTime()){        
    //             return true;      
    //           }      
    //           return false;
      
    //         }).length;


    //         day.TotalEncargos = value.filter(a=> a.servicio=='encargo').filter(a=> {      
    //           if(a.fecha.getTime() === day.fecha.getTime()){        
    //             return true;      
    //           }      
    //           return false;
      
    //         }).length;


    //       }
          

    //     })

    //   })
    // }
  }

  Setyears() {
    this.Years = [];
    for(var i=1930; i < new Date().getFullYear() + 10; i++){
      this.Years.push(i);
    }
  }

  selectChangedMonth(item){
    this.currentMonth = parseInt(item.detail.value);
    this.dateParaMontarCalendar.setMonth(this.currentMonth);
    if(this.dateSelected && this.currentMonth != this.dateSelected.getMonth()){
      //vengo de setToday
      this.dateSelected = null;
    }
    
    this.refreshEnvents.emit(this.dateParaMontarCalendar);
    this.getDiasMes();

  }

  selectChangedYear(item){
    this.currentYear = parseInt(item.detail.value);
    this.dateParaMontarCalendar.setFullYear(this.currentYear);

    if(this.currentYear != this.dateSelected.getFullYear()){
      //vengo de setToday
      this.dateSelected = null;
    }

    this.refreshEnvents.emit(this.dateParaMontarCalendar);
    this.getDiasMes();
  }

  SetToday()
  {    
    this.dateParaMontarCalendar= new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());
    this.currentMonth = this.dateParaMontarCalendar.getMonth();
    this.currentYear = this.dateParaMontarCalendar.getFullYear();   
    this.getDiasMes();    
    this.dateSelected = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());
    this.refreshEnvents.emit(this.dateParaMontarCalendar);
    this.refreshSelectedDate.emit(this.dateSelected);
  }

  

  setlanguaje() {
    this.months = this.languageService.MonthsName[this.lan];
    this.days = this.languageService.daysName[this.lan];

  }




  padWithZero(num, targetLength) {    
    return String(num).padStart(targetLength, '0')
  }

  FormatShortDate(date){
    if(date){
      switch(this.lan){

        case 'ES' : 
        default :
        return `${this.padWithZero(date.getDate(),2)}/${this.padWithZero((date.getMonth()+1),2)}/${date.getFullYear()}`
      }

    }
    return '-';
  }

 
  getDiasMes(){


    var lstDiasMes=[];
    this.lstDiasMesinWeek=[];

    let anno = this.dateParaMontarCalendar.getFullYear();
    let month=this.dateParaMontarCalendar.getMonth() + 1;
    let diasMes =new Date(anno,month,0).getDate();

    var indicePrimerDia =  new Date(anno, month - 1, 1).getDay();
    switch(this.lan){
      case 'EN':
        for(var indice=1; indice <=indicePrimerDia; indice++){
          lstDiasMes.push({dia, indice});
        }
      break;        
      case 'ES':
      default:
        if(indicePrimerDia==0){
          //domingo
          for(var indice=1; indice <=6; indice++){
    
            lstDiasMes.push({dia, indice});
          }
    
        }
        else{
          for(var indice=1; indice <indicePrimerDia; indice++){
            lstDiasMes.push({dia, indice});
          }
        }
          
      break;
    }

    for (var dia = 1; dia <= diasMes; dia++) {
      // Ojo, hay que restarle 1 para obtener el mes correcto

      var fecha = new Date(anno, month - 1, dia);
      var indice = fecha.getDay();
      var TotalEnventos = 0;
      // indice 0 ==> Domingo
      lstDiasMes.push({fecha,dia, indice, TotalEnventos});
    }

    var lstWeek = [];
    for(var i=1; i<=lstDiasMes.length; i++){

      lstWeek.push(lstDiasMes[i-1]);
      if(i % 7 == 0){
        this.lstDiasMesinWeek.push(lstWeek);
        lstWeek=[];
      }
    }
    if(lstWeek.length > 0){
      for(var i=lstWeek.length; i< 7;i++ )
      {
        lstWeek.push({});
      }
      this.lstDiasMesinWeek.push(lstWeek);
    }

    this.setEventosInCalendar();

  }


  selectDay(item){

    if(!item?.fecha) return null;

    this.dateSelected = item && item.fecha ? item.fecha : this.dateSelected;
    this.refreshSelectedDate.emit(this.dateSelected);
    this.getDateSelected.emit(this.dateSelected);
    // this.getDiasMes();
  }

}