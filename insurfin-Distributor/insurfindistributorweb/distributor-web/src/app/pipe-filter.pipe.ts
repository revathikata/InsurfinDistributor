import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class PipeFilterPipe implements PipeTransform {
  // AllCustomerList:any[] =[]
  // transform(value: any, filterString: any):any {
  //   if(value.length === 0 || filterString === ''){
  //    return value
  //   }
  //   const AllCustomerList:any = []
  //   for(const data of value){
  //    if(data['customerName'] === filterString){
  //      AllCustomerList.push(data)
  //    }
  //   }
  //   return AllCustomerList;
  //  }
  transform(items: any[],fieldName:string, term: string): any {
    // I am unsure what id is here. did you mean title?
    return items?.filter(item => item[fieldName]?.indexOf(term) !== -1);
}

}
