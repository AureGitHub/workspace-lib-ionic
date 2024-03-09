import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TreeModule } from 'primeng/tree';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';

import { DataViewModule } from 'primeng/dataview';


// import { ListboxModule } from 'primeng/listbox';
// import { TabViewModule } from 'primeng/tabview';

// import { BreadcrumbModule } from 'primeng/breadcrumb';
// import { ProgressBarModule } from 'primeng/progressbar';

// import { ContextMenuModule } from 'primeng/contextmenu';

// import { PickListModule } from 'primeng/picklist';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { OrderListModule } from 'primeng/orderlist';
// import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ButtonModule,
        TabMenuModule,
        MenubarModule,
        TieredMenuModule,
        ToolbarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        ToastModule,
        ConfirmDialogModule,
        DataViewModule,
        DropdownModule,
        TableModule,
        DialogModule,
        TooltipModule,
        CalendarModule,
        CardModule,
       
        CheckboxModule,
        FileUploadModule,
       
        AutoCompleteModule,
        
      RadioButtonModule,
      AccordionModule,
      TreeModule,
    //   ContextMenuModule,
    //   PickListModule,
    //   OrderListModule,
    //   InputNumberModule,
    //   FieldsetModule ,
    //   ListboxModule,
    //   TabViewModule,
    //   BreadcrumbModule,
    //   ProgressBarModule,

    ],
    exports: [
        CommonModule,
        ButtonModule,
        TabMenuModule,
        MenubarModule,
        TieredMenuModule,
        ToolbarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        ToastModule,
        ConfirmDialogModule,
        DataViewModule,
        DropdownModule,
        TableModule,
        DialogModule,
        TooltipModule,
        CalendarModule,
        CardModule,
        CheckboxModule,
        FileUploadModule,
        AutoCompleteModule,
      RadioButtonModule,
      AccordionModule,
      TreeModule,
     //   ContextMenuModule,
    //   PickListModule,
    //   OrderListModule,
    //   InputNumberModule,
    //   FieldsetModule ,
    //   ListboxModule,
    //   TabViewModule,
    //   BreadcrumbModule,
    //   ProgressBarModule,
    ]
})
export class MyprimengModule { }
