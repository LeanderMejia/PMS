import { Component, Input, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NgForm } from '@angular/forms';
import { PlantedTreesData } from 'src/app/model/planted-trees-data';
import { Router } from '@angular/router';

@Component({
    selector: 'app-planted-trees',
    templateUrl: './planted-trees.component.html',
    styleUrls: ['./planted-trees.component.css']
})
export class PlantedTreesComponent {

    @ViewChild('cancelButton') cancelButton: any;
    @Input() month = '';
    
    permitArray: any[] = [];
    printPermitArray: any[] = [];
    permitUpdateFormData: any = [];
    filteredPermitArray: any[] = [];

    dateIssued: string = '';
    dateExpired: string = '';

    PlantedTreesDataModel: PlantedTreesData;
    
    constructor(private firestoreService: FirestoreService) {
        this.PlantedTreesDataModel = new PlantedTreesData(this.permitUpdateFormData.applicantName, this.permitUpdateFormData.typeOfPermit, this.permitUpdateFormData.speciesCutHarvest, this.permitUpdateFormData.volume, new Date(this.permitUpdateFormData.dateIssued), new Date(this.permitUpdateFormData.dateExpired), this.permitUpdateFormData.address);
    }

    ngOnInit(): void {
        this.readPlantedTreesPermit();
    }

    readPlantedTreesPermit() {
        this.firestoreService.readData("PlantedTreesPermit");
        this.firestoreService.getPermitData().subscribe((fetchDataArray: any[]) => {
            this.permitArray = fetchDataArray;
        });

        this.firestoreService.readPrintPermitData("PlantedTreesPermit");
        this.firestoreService.getPrintPermitData().subscribe((fetchDataArray: any[]) => {
            this.printPermitArray = fetchDataArray; 
        })
    }

    displayUpdateModal(permitData: any) {
        const updateData = this.firestoreService.getUpdatePermitData(this.permitUpdateFormData, permitData);
        this.permitUpdateFormData = updateData.updateDataArr;
        this.dateIssued = updateData.date_issued;
        this.dateExpired = updateData.date_expired;
    }

    updatePlantedTreesDocument(form: NgForm, documentID: string) {
        this.PlantedTreesDataModel = new PlantedTreesData(this.permitUpdateFormData.applicant_name.trim(), this.permitUpdateFormData.type_of_permit.trim(), this.permitUpdateFormData.species_cut_harvest.trim(), this.permitUpdateFormData.volume.trim(), new Date(this.dateIssued), new Date(this.dateExpired), this.permitUpdateFormData.address.trim());
    
        if (this.PlantedTreesDataModel.hasEmptyValues()) {
            alert("Error! Please make sure all fields are filled up.");
            return;
        }
        
        const response = confirm("Are you sure want to update this data?");
        if (response) {
            this.firestoreService.updateData("PlantedTreesPermit", documentID, this.PlantedTreesDataModel.toJSON());
            this.cancelButton.nativeElement.click();
        }
    }

    deletePlantedTreesDocument(documentID: string) {
        const response = confirm("Are you sure want to delete this data?");
        if (response) {
            this.firestoreService.deleteData("PlantedTreesPermit", documentID);
        }
    }

    
    handleQueryResult(plantedTreesData: PlantedTreesData[]) {
        this.filteredPermitArray = plantedTreesData;
    }

    handleMonthValue(monthValue: string) {
        this.month = monthValue;
    }

    onPrint() {
        window.print();
    }
}