import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WoodCharcoalData } from 'src/app/model/wood-charcoal-data';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'app-wood-charcoal',
    templateUrl: './wood-charcoal.component.html',
    styleUrls: ['./wood-charcoal.component.css']
})
export class WoodCharcoalComponent {

    @ViewChild('cancelButton') cancelButton: any;
    @Input() month = '';

    permitArray: any[] = [];
    printPermitArray: any[] = [];
    permitFormData: any = [];
    filteredPermitArray: any[] = [];

    dateIssued: string = '';
    dateExpired: string = '';

    WoodCharcoalDataModel: WoodCharcoalData;

    ngOnInit(): void {
        this.readWoodCharcoalPermit();
    }

    constructor(private firestoreService: FirestoreService) {
        this.WoodCharcoalDataModel = new WoodCharcoalData(this.permitFormData.applicantName, this.permitFormData.WCTPNo, this.permitFormData.speciesHarvest, this.permitFormData.noOfSacks, new Date(this.permitFormData.dateIssued), new Date(this.permitFormData.dateExpired), this.permitFormData.address);
    }

    readWoodCharcoalPermit() {
        this.firestoreService.readData("WoodCharcoalPermit");
        this.firestoreService.getPermitData().subscribe((fetchDataArr) => {
            this.permitArray = fetchDataArr;
        });

        this.firestoreService.readPrintPermitData("WoodCharcoalPermit");
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

    updateWoodCharcoalDocument(form: NgForm, documentID: string) {
        this.WoodCharcoalDataModel = new WoodCharcoalData(this.permitFormData.applicant_name.trim(), this.permitFormData.wctp_no.trim(), this.permitFormData.species_harvest.trim(), this.permitFormData.no_of_sacks.trim(), new Date(this.dateIssued), new Date(this.dateExpired), this.permitFormData.address.trim());

        if (this.WoodCharcoalDataModel.hasEmptyValues()) {
            alert("Error! Please make sure all fields are filled up.");
            return;
        }

        const response = confirm("Are you sure want to update this data?");
        if (response) {
            this.firestoreService.updateData("WoodCharcoalPermit", documentID, this.WoodCharcoalDataModel.toJSON());
            this.cancelButton.nativeElement.click();
        }
    }

    deleteWoodCharcoalDocument(documentID: string) {
        const response = confirm("Are you sure want to delete this data?");
        if (response) {
            this.firestoreService.deleteData("WoodCharcoalPermit", documentID);
        }
    }


    handleQueryResult(woodCharcoalData: WoodCharcoalData[]) {
        this.filteredPermitArray = woodCharcoalData;
    }

    handleMonthValue(monthValue: string) {
        this.month = monthValue;
    }

    onPrint() {
        window.print();
    }
}