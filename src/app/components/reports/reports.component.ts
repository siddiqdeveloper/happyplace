import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, HostListener, ElementRef,ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css'],
    providers: [DatePipe]
})
export class ReportsComponent implements OnInit {
    title = 'app';  

    @ViewChild('content',{ static :false}) content:ElementRef;  

    today = new Date();
    todayStockReport = [];
    stockDate = [];
    todayExpenseReport = [];
    todayExpenseTotal = [];
    expenseDate = [];
    todayBillPreviewReport = [];
    todayBillReport = [];
    todayZomatoBillReport = [];
    todayBillTotal: any = 0;
    todayZomatoBillTotal:any = 0;
    billDate = [];
    billPreviewDate = [];
    todayIngredientReport = [];
    IngredientDate = [];
    todayProductReport = [];
    productDate = [];
    todayCashierReport = [];
    todayCashierRevenue:any = [];
    cashierDate = [];
    todayServerReport = [];
    todayServerRevenue = [];
    serverDate = [];
    todayHallReport = [];
    todayHallRevenue:any= [];
    hallDate = [];
    activeHallList = [];
    hallId = '';
    p = 1;
    errorMsg = false;
    loading = false;
    activeBranchList = [];
    selectBranchId: any = '';
    selectBranchName: any = '';
    branchClass = -1;
    roleId: any = `${localStorage.getItem('role_id')}`;
    roleName: any = `${localStorage.getItem('role')}`;
    showBill = false;
    showExpense = false;
    showDish = false;
    showHalls = false;
    date:any = '';
    time = '';
    num:number = 1;
    zomatoDate = [];
    showCustomer = false;
    cgst: any = '';
    sgst: any = '';
    parcel: any = '';
    Gst: any = '';
    overAllGst:any;
    overAllTotalAndGst:any;
    discount:any;
    hideHeading: boolean;
    showHeading: boolean;
    getfromdate: any;
    constructor(private apiService: ApiService, private datePipe: DatePipe, private toastr: ToastrService, private router: Router) { }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if(event.altKey && event.key === 'c') {
            this.createBillRedirect();
        }
    }

    ngOnInit() {
        this.time = this.datePipe.transform(new Date());
        // this.listActiveBranches();
    }

    public openPDF(): void {
        let DATA: any = document.getElementById('salesReport');
       
        html2canvas(DATA).then((canvas) => {
          let fileWidth = 190;
          let fileHeight = (canvas.height * fileWidth) / canvas.width;
          const FILEURI = canvas.toDataURL('image/png');
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 10;
          PDF.addImage(FILEURI, 'PNG', 10, position, fileWidth, fileHeight);
          PDF.save('sales_report');
        });
      }


    createBillRedirect() {
        if(this.roleName === 'cashier') {
            this.router.navigate(['createbill']);
        }
    }

    listAllReports() {
        this.getExpenseReports('today');
        this.getBillReports('today');
        this.getProductReport('today');
        this.getCashierReport('today');
        this.getServerReport('today');
        this.getHallDetails();
        this.getBillPreviewReports('today');
    }

    listActiveBranches() {
        this.loading = true;
        this.apiService.getData('listActiveBranches').subscribe((data) => {
            this.loading = false;
            if (this.roleName === 'user') {
                this.activeBranchList = data.data;
            } else {
                this.selectBranchId = `${localStorage.getItem('branchId')}`;
                this.selectBranchName = `${localStorage.getItem('branchName')}`;
                this.activeBranchList = [{
                    branch_id: this.selectBranchId, branch_name: this.selectBranchName
                }];
            }
            if (this.activeBranchList.length !== 0) {
                setTimeout(() => {
                    const branchClick = document.querySelector('#branchname') as HTMLElement;
                    branchClick.click();
                });
            }
        }, error => {
            this.loading = false;
        });
    }

    branchNameSelect(id, name, index) {
        this.hallId = '';
        this.todayHallReport = [];
        this.todayHallRevenue = [];
        this.p = 1;
        this.selectBranchId = id;
        this.selectBranchName = name;
        this.branchClass = index;
        this.listAllReports();
    }

    // ExpensesReport

    formatCurrentDate() {
        return {
            currentDate: formatDate(new Date(this.today), 'yyyy-MM-dd', 'en'), branch_id: this.selectBranchId
        };
    }

   
// y-M-d h:mm:ss
    formatFromToDate(from, to) {
        return {
           fromDate: formatDate(new Date(from), 'yyyy-MM-dd', 'en'),
            toDate: formatDate(new Date(to), 'yyyy-MM-dd', 'en'),    
           
        };
       
    }

    getExpenseReports(tags) {
        this.loading = true;
        let params: any = '';
        if (tags === 'today') {
            params = this.formatCurrentDate();
            this.expenseDate = [];
        } else if (tags === 'multidate') {
            if (this.expenseDate === null || this.expenseDate.length === 0) {
                this.toastr.error('Please Choose a Date');
                this.loading = false;
                return false;
            } else {
                params = this.formatFromToDate(this.expenseDate[0], this.expenseDate[1]);
            }
        }
        this.apiService.postData(params, 'getExpenseReports').subscribe((data) => {
            this.todayExpenseReport = data.data.expenseReports;
            console.log(data.data)
            this.todayExpenseTotal = data.data.expenseTotal.expenseAmount;
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }

    getBillPreviewReports(tags){
        this.loading = true;
        let params: any = '';
        if (tags === 'today') {
            params = this.formatCurrentDate();
            this.billPreviewDate = [];
        } else if (tags === 'multidate') {
            if (this.billPreviewDate === null || this.billPreviewDate.length === 0) {
                this.toastr.error('Please Choose a Date');
                this.loading = false;
                return false;
            } else {
                params = this.formatFromToDate(this.billPreviewDate[0], this.billPreviewDate[1]);
            }
        }
        this.apiService.postData(params, 'getBillPreview').subscribe((data) => {
            this.todayBillPreviewReport = data.data.data;
            this.loading = false;

            this.todayBillPreviewReport.forEach(element => {
                this.discount += +element.discount_value;
            });
            // console.log(data.data);
            
        }, error => {
            this.loading = false;
        });
    }

    getBillReports(tags) {
        this.todayBillTotal = 0;
        this.loading = true;
        let params: any = '';
        if (tags === 'today') {
            params = this.formatCurrentDate(); 
            this.billDate = [];
        } else if (tags === 'multidate') {
            if (this.billDate === null || this.billDate.length === 0) {
                this.toastr.error('Please Choose a Date');
                this.loading = false;
                return false;
            } else {
                params = this.formatFromToDate(this.billDate[0], this.billDate[1]);
            }

        }
        // params = new DatePipe('en-US').transform(params, 'EEEE y-MMM-dd hh:mm a');
        this.apiService.postData(params, 'getBillReports').subscribe((data) => {
            console.table()
            this.todayBillReport = data.data;
            // this.Gst = data.data.Gst;
            this.loading = false;
            this.todayBillReport.forEach(element => {
                this.todayBillTotal += +element.order_overall_totall;
            });
            // this.discount = data.data.discount_value.discount_value;
            // this.overAllGst = this.todayBillTotal * this.Gst/100;
            // console.log(this.overAllGst);
            // this.overAllTotalAndGst = this.todayBillTotal + this.overAllGst;

        }, error => {
            this.loading = false;
        });
    }
    exportXl(list, name) {
        const workBook = XLSX.utils.book_new(); // create a new blank book
        const workSheet = XLSX.utils.json_to_sheet(list);

        XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
        XLSX.writeFile(workBook, `${name}.xlsx`); //
    }

    public SavePDF(): void { 
        // alert('PDf');
         
        let content=this.content.nativeElement;  
        let doc = new jsPDF();  
        // const doc = new jspdf.jsPDF();
        
        let _elementHandlers =  
        {  
          '#editor':function(element,renderer){  
            return true;  
          }  
        };  
        doc.html(content.innerHTML,{  
            'x': 15,
            'y': 15,
          'width':190,  
        //   'elementHandlers':_elementHandlers  
        }); 
         
      
        doc.save('reports.pdf');  
        doc.output('dataurlnewwindow'); // just open it

      } 
      
    

   
    getProductReport(tags) {
        this.loading = true;
        let params: any = '';
        if (tags === 'today') {
            params = this.formatCurrentDate();
            this.productDate = [];
        } else if (tags === 'multidate') {
            if (this.productDate === null || this.productDate.length === 0) {
                this.toastr.error('Please Choose a Date');
                this.loading = false;
                return false;
            } else {
                params = this.formatFromToDate(this.productDate[0], this.productDate[1]);
            }
        }
        this.apiService.postData(params, 'getItemReports').subscribe((data) => {
            this.todayProductReport = data.data;
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }

    // CashierReport

    getCashierReport(tags) {
        this.loading = true;
        let params: any = '';
        if (tags === 'today') {
            params = this.formatCurrentDate();
            this.cashierDate = [];
        } else if (tags === 'multidate') {
            if (this.cashierDate === null || this.cashierDate.length === 0) {
                this.toastr.error('Please Choose a Date');
                this.loading = false;
                return false;
            } else {
                params = this.formatFromToDate(this.cashierDate[0], this.cashierDate[1]);
            }
        }
        this.apiService.postData(params, 'getCashierReports').subscribe((data) => {
            this.todayCashierReport = data.data.data;
            this.todayCashierRevenue = data.data.cashier_revenue;
            this.Gst = data.data.Gst;
            this.overAllGst = this.todayCashierRevenue * this.Gst/100;
            console.log(this.overAllGst);
            this.discount = data.data.discount_value.discount_value;
            this.overAllTotalAndGst = this.todayCashierRevenue + this.overAllGst;

            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }

    getServerReport(tags) {
        this.loading = true;
        let params: any = '';
        if (tags === 'today') {
            params = this.formatCurrentDate();
            this.serverDate = [];
        } else if (tags === 'multidate') {
            if (this.serverDate === null || this.serverDate.length === 0) {
                this.toastr.error('Please Choose a Date');
                this.loading = false;
                return false;
            } else {
                params = this.formatFromToDate(this.serverDate[0], this.serverDate[1]);
            }
        }
        this.apiService.postData(params, 'getServerReports').subscribe((data) => {
            this.todayServerReport = data.data.data;
            this.todayServerRevenue = data.data.server_revenue;
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }

    // HallReport

    getHallDetails() {
        this.apiService.getData('listAllHalls', this.selectBranchId).subscribe(data => {
            this.activeHallList = data.data;
        });
        console.log(this.selectBranchId);
    }

    getHallReport(tags) {
        console.log(this.hallId);
        this.loading = true;
        if (this.hallId === '') {
            this.errorMsg = false;
            this.toastr.error('Please choose a Hall First');
            this.loading = false;
            return false;
        }
        this.errorMsg = true;
        let params: any = '';
        if (tags === 'today') {
            params = this.formatCurrentDate();
            this.hallDate = [];
            this.loading = true;
        } else if (tags === 'multidate') {
            if (this.hallDate === null || this.hallDate.length === 0) {
                this.toastr.error('Please Choose a Date');
                this.loading = false;
                return false;
            } else {
                params = this.formatFromToDate(this.hallDate[0], this.hallDate[1]);
            }
        }
        this.apiService.postData(params, `getHallReports/${this.hallId}`).subscribe((data) => {
            this.todayHallReport = data.data.data;
            this.todayHallRevenue = data.data.hall_bills_total;
            // this.todayHallReport.push({Total_Amount: this.todayHallRevenue});
            this.Gst = data.data.Gst;
            this.overAllGst = this.todayHallRevenue * this.Gst/100;
            console.log(this.overAllGst);
            this.discount = data.data.discount_value.discount_value;
            this.overAllTotalAndGst = this.todayHallRevenue + this.overAllGst;

            console.log(data.data);
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }


    printBill(type) {
        this.date = formatDate(new Date(this.today), 'yyyy-MM-dd', 'en');
        this.time = formatDate(new Date(new Date), 'hh:mm a', 'en');
        if(type === 'bill') {
            this.showBill =true;
            setTimeout(() => {
                this.printBillReports();
            }, 500);
        }

        if(type === 'billPreview'){
            this.hideHeading = false;
            this.showHeading = true;
            setTimeout(() => {
                this.printBillPreviewReports();
            }, 500);
        }
    }

    printBillPreviewReports(){
        
        const printContent = document.getElementById('bill_container');
            const WindowPrt = window.open('', '', 'left=0,top=0,width=700,height=700,toolbar=0,scrollbars=0,status=0');
            WindowPrt.document.write('<style type="text/css"></style>');
            WindowPrt.document.write(printContent.innerHTML);
            WindowPrt.print();
            WindowPrt.close();
            this.hideHeading = true;
            this.showHeading = false;
        }

    printBillReports() { 
        const printContent = document.getElementById('bill_reports_container');
        const WindowPrt = window.open('', '', 'left=0,top=0,width=700,height=700,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write('<style type="text/css"></style>');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.print();
        WindowPrt.close();
        this.showBill = false;
    }

}

