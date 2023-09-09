import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BambooData } from 'src/app/model/bamboo-data';
import { PlantedTreesData } from 'src/app/model/planted-trees-data';
import { WoodCharcoalData } from 'src/app/model/wood-charcoal-data';
import { getFirestore } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent {

    @ViewChild('addPermitForm', { static: false }) addPermitForm!: NgForm;
    @Input() plantedTreesPermitArray: any[] = [];
    @Input() bambooPermitArray: any[] = [];
    @Input() woodCharcoalPermitArray: any[] = [];
    @Output() plantedTreesQueryArray = new EventEmitter<PlantedTreesData[]>();
    @Output() bambooQueryArray = new EventEmitter<BambooData[]>();
    @Output() woodCharcoalQueryArray = new EventEmitter<WoodCharcoalData[]>();
    @Output() monthValueForPrint = new EventEmitter<string>();

    permitData = {
        applicantName: '',
        typeOfPermit: '',
        WCTPNo: '',
        speciesCutHarvest: '',
        speciesHarvest: '',
        volume: '',
        noOfPieces: '',
        noOfSacks: '',
        dateIssued: '',
        dateExpired: '',
        address: ''
    };

    placeholder = 'Name of Applicant';
    searchInput = '';
    dateInput = '';
    monthInput = '';
    title = '';

    searchIsClicked = false;
    filterDateIsClicked = false;
    filterMonthIsClick = false;

    PlantedTreesDataModel: PlantedTreesData;
    BambooDataModel: BambooData;
    WoodCharcoalDataModel: WoodCharcoalData;

    isInPlantedTrees = this.router.url === '/planted-trees';
    isInBamboo = this.router.url === '/bamboo';
    isInWoodCharcoal = this.router.url === '/wood-charcoal';

    db = getFirestore();

    constructor(public router: Router, private firestoreService: FirestoreService, private datePipe: DatePipe) {
        this.PlantedTreesDataModel = new PlantedTreesData(this.permitData.applicantName, this.permitData.typeOfPermit, this.permitData.speciesCutHarvest, this.permitData.volume, new Date(this.permitData.dateIssued), new Date(this.permitData.dateExpired), this.permitData.address);
        this.BambooDataModel = new BambooData(this.permitData.applicantName, this.permitData.typeOfPermit, this.permitData.speciesCutHarvest, this.permitData.noOfPieces, new Date(this.permitData.dateIssued), new Date(this.permitData.dateExpired), this.permitData.address);
        this.WoodCharcoalDataModel = new WoodCharcoalData(this.permitData.applicantName, this.permitData.WCTPNo, this.permitData.speciesHarvest, this.permitData.noOfSacks, new Date(this.permitData.dateIssued), new Date(this.permitData.dateExpired), this.permitData.address);
    }


    ngOnChanges(changes: SimpleChanges): void {
        const permitArrayHasChanges = changes['plantedTreesPermitArray'] || changes['bambooPermitArray'] || changes['woodCharcoalPermitArray'];
        if (permitArrayHasChanges && this.searchIsClicked) {
            this.onSearch();
        }
        else if (permitArrayHasChanges && this.filterDateIsClicked) {
            this.onFilterDate();
        }
        else if (permitArrayHasChanges && this.filterMonthIsClick) {
            this.onFilterMonth();
        }
    }

    ngOnInit(): void {
        if (this.router.url == '/planted-trees') {
            this.title = "Planted Trees";
        } else if (this.router.url == '/bamboo') {
            this.title = "Bamboo";
        } else if (this.router.url == '/wood-charcoal') {
            this.title = "Wood Charcoal";
        }
    }

    onAddPermit(form: NgForm) {
        if (this.router.url == '/planted-trees') {
            this.createPlantedTreesCollection(form);
        } else if (this.router.url == '/bamboo') {
            this.createBambooCollection(form);
        } else if (this.router.url == '/wood-charcoal') {
            this.createWoodCharcoalCollection(form);
        }
    }

    onCancelAddingPermit(form: NgForm) {
        form.resetForm();
    }

    errorALertMessage() {
        alert("Error! Please make sure all fields are filled up.");
    }

    successAlertMessage(title: string) {
        alert("Success! " + title + " Permit has been added to the database.");
    }

    createPlantedTreesCollection(form: NgForm) {
        this.PlantedTreesDataModel = new PlantedTreesData(this.permitData.applicantName.trim(), this.permitData.typeOfPermit.trim(), this.permitData.speciesCutHarvest.trim(), this.permitData.volume.trim(), new Date(this.permitData.dateIssued), new Date(this.permitData.dateExpired), this.permitData.address.trim());

        if (this.PlantedTreesDataModel.hasEmptyValues()) {
            this.errorALertMessage();
            return;
        }
        this.firestoreService.createData("PlantedTreesPermit", this.PlantedTreesDataModel);
        form.resetForm();
        this.successAlertMessage("Planted Trees");

    }

    createBambooCollection(form: NgForm) {
        this.BambooDataModel = new BambooData(this.permitData.applicantName.trim(), this.permitData.typeOfPermit.trim(), this.permitData.speciesCutHarvest.trim(), this.permitData.noOfPieces.trim(), new Date(this.permitData.dateIssued), new Date(this.permitData.dateExpired), this.permitData.address.trim());
        if (this.BambooDataModel.hasEmptyValues()) {
            this.errorALertMessage();
            return;
        }
        this.firestoreService.createData("BambooPermit", this.BambooDataModel);
        form.resetForm();
        this.successAlertMessage("Bamboo");
    }

    createWoodCharcoalCollection(form: NgForm) {
        this.WoodCharcoalDataModel = new WoodCharcoalData(this.permitData.applicantName.trim(), this.permitData.WCTPNo.trim(), this.permitData.speciesHarvest.trim(), this.permitData.noOfSacks.trim(), new Date(this.permitData.dateIssued), new Date(this.permitData.dateExpired), this.permitData.address.trim());
        if (this.WoodCharcoalDataModel.hasEmptyValues()) {
            this.errorALertMessage();
            return;
        }
        this.firestoreService.createData("WoodCharcoalPermit", this.WoodCharcoalDataModel);
        form.resetForm();  
        this.successAlertMessage("Wood Charcoal");
    }

    onSearch() {
        this.searchIsClicked = true;
        this.filterDateIsClicked = false;
        this.filterMonthIsClick = false;
        this.clearFilterFields();
        if (this.router.url === '/planted-trees') {
            this.querySearch(this.searchInput, this.plantedTreesPermitArray, this.plantedTreesQueryArray);
        } else if (this.router.url === '/bamboo') {
            this.querySearch(this.searchInput, this.bambooPermitArray, this.bambooQueryArray);
        } else if (this.router.url === '/wood-charcoal') {
            this.querySearch(this.searchInput, this.woodCharcoalPermitArray, this.woodCharcoalQueryArray);
        }

    }

    querySearch(searchInput: string, permitArray: any, queryResultArray: any) {
        const upperCaseSearchInput = searchInput.toUpperCase();
        const filteredPermit = permitArray.filter((item: { applicant_name: string; }) => {
            const upperCaseApplicantName = item.applicant_name.toUpperCase();
            return upperCaseSearchInput && upperCaseApplicantName.includes(upperCaseSearchInput);
        });
        queryResultArray.emit(filteredPermit);
    }

    onFilterDate() {
        this.filterDateIsClicked = true;
        this.searchIsClicked = false;
        this.filterMonthIsClick = false;
        this.clearFilterFields();
        if (this.router.url === '/planted-trees') {
            this.queryDate(this.dateInput, this.plantedTreesPermitArray, this.plantedTreesQueryArray);
        } else if (this.router.url === '/bamboo') {
            this.queryDate(this.dateInput, this.bambooPermitArray, this.bambooQueryArray);
        } else if (this.router.url === '/wood-charcoal') {
            this.queryDate(this.dateInput, this.woodCharcoalPermitArray, this.woodCharcoalQueryArray);
        }

    }

    queryDate(dateInput: string, permitArray: any, queryResultArray: any) {
        const formattedDateIssuedInput = this.datePipe.transform(dateInput, 'MMM d y');
        const filteredPermit = permitArray.filter((item: { date_issued: object; }) => {
            const dateString = item.date_issued.toString();
            const formattedDateString = this.datePipe.transform(dateString, 'MMM d y');
            if (formattedDateString === null) return;
            return formattedDateIssuedInput && formattedDateString.includes(formattedDateIssuedInput);
        });
        queryResultArray.emit(filteredPermit);
    }

    onFilterMonth() {
        this.filterMonthIsClick = true;
        this.searchIsClicked = false;
        this.filterDateIsClicked = false;
        this.clearFilterFields();
        if (this.router.url === '/planted-trees') {
            this.queryMonth(this.monthInput, this.plantedTreesPermitArray, this.plantedTreesQueryArray);
        } else if (this.router.url === '/bamboo') {
            this.queryMonth(this.monthInput, this.bambooPermitArray, this.bambooQueryArray);
        } else if (this.router.url === '/wood-charcoal') {
            this.queryMonth(this.monthInput, this.woodCharcoalPermitArray, this.woodCharcoalQueryArray);
        }

    }

    queryMonth(monthInput: string, permitArray: any, queryResultArray: any) {
        const formattedMonthInput = this.datePipe.transform(monthInput, 'MMM y');
        const filteredPermit = permitArray.filter((item: { date_issued: object; }) => {
            const dateString = item.date_issued.toString();
            const formattedDateString = this.datePipe.transform(dateString, 'MMM y');
            if (formattedDateString === null) return;
            return formattedMonthInput && formattedDateString.includes(formattedMonthInput);
        });
        if (filteredPermit.length != 0) {
            const monthValueFormat = this.datePipe.transform(this.monthInput, 'MMMM y');
            this.monthValueForPrint.emit(monthValueFormat?.toString());
        } else {
            this.monthValueForPrint.emit("");
        }
        queryResultArray.emit(filteredPermit);
    }

    clearFilterFields() {
        if (this.searchIsClicked) {
            this.dateInput = '';
            this.monthInput = '';
        } else if (this.filterDateIsClicked) {
            this.searchInput = '';
            this.monthInput = '';
        } else if (this.filterMonthIsClick) {
            this.searchInput = '';
            this.dateInput = '';
        }
    }
}