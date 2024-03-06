export class Page {
    
     // The total number of elements
    count: number = 0;
   // The number of elements in the page
    limit: number = 0;
    // The current page number    
    offset: number = 0;
    
    // The total number of pages
    pageSize: number = 0;

    withCache: boolean = false;
  }