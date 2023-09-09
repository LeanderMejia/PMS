import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BambooData } from 'src/app/model/bamboo-data';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'app-bamboo',
    templateUrl: './bamboo.component.html',
    styleUrls: ['./bamboo.component.css']
})
export class BambooComponent {

    @ViewChild('cancelButton') cancelButton: any;
    @Input() month = '';

    permitArray: any[] = [];
    printPermitArray: any[] = [];
    permitFormData: any = [];
    filteredPermitArray: any[] = [];

    dateIssued: string = '';
    dateExpired: string = '';

    BambooDataModel: BambooData;
    
    ngOnInit(): void {
        this.readBambooPermit();
    }

    constructor(private firestoreService: FirestoreService) {
        this.BambooDataModel = new BambooData(this.permitFormData.applicantName, this.permitFormData.typeOfPermit, this.permitFormData.speciesCutHarvest, this.permitFormData.noOfPieces, new Date(this.permitFormData.dateIssued), new Date(this.permitFormData.dateExpired), this.permitFormData.address);
    }

    readBambooPermit() {
        this.firestoreService.readData("BambooPermit");
        this.firestoreService.getPermitData().subscribe((fetchDataArr) => {
            this.permitArray = fetchDataArr;
        });

        this.firestoreService.readPrintPermitData("BambooPermit");
        this.firestoreService.getPrintPermitData().subscribe((fetchDataArray: any[]) => {
            this.printPermitArray = fetchDataArray;
        })
    }

    displayUpdateModal(permitData: any) {
        const updateData = this.firestoreService.getUpdatePermitData(this.permitFormData, permitData);
        this.permitFormData = updateData.updateDataArr;
        this.dateIssued = updateData.date_issued;
        this.dateExpired = updateData.date_expired;
    }

    updateBambooDocument(form: NgForm, documentID: string) {
        this.BambooDataModel = new BambooData(this.permitFormData.applicant_name.trim(), this.permitFormData.type_of_permit.trim(), this.permitFormData.species_cut_harvest.trim(), this.permitFormData.no_of_pieces.trim(), new Date(this.dateIssued), new Date(this.dateExpired), this.permitFormData.address.trim());

        if (this.BambooDataModel.hasEmptyValues()) {
            alert("Error! Please make sure all fields are filled up.");
            return;
        }

        const response = confirm("Are you sure want to update this data?");
        if (response) {
            this.firestoreService.updateData("BambooPermit", documentID, this.BambooDataModel.toJSON());
            this.cancelButton.nativeElement.click();
        }
    }

    deleteBambooDocument(documentID: string) {
        const response = confirm("Are you sure want to delete this data?");
        if (response) {
            this.firestoreService.deleteData("BambooPermit", documentID);
        }
    }


    handleQueryResult(bambooData: BambooData[]) {
        this.filteredPermitArray = bambooData;
    }

    handleMonthValue(monthValue: string) {
        this.month = monthValue;
    }
    
    onPrint() {
        window.print();
    }
}