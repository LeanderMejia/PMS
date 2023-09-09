import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
    selector: 'app-print-table',
    templateUrl: './print-table.component.html',
    styleUrls: ['./print-table.component.css']
})
export class PrintTableComponent {

    @Input() plantedTreesPermitArray: any[] = [];
    @Input() plantedTreesFilteredArray: any[] = [];
    @Input() bambooPermitArray: any[] = [];
    @Input() bambooFilteredArray: any[] = [];
    @Input() woodCharcoalPermitArray: any[] = [];
    @Input() woodCharcoalFilteredArray: any[] = [];
    @Input() monthValue = '';

    title: string = '';
    permitCategory = '';

    permitArray: any[] = [];
    filteredPermitArray: any[] = [];
    signatoriesData: any = [];

    isInPlantedTrees = this.router.url === '/planted-trees';
    isInBamboo = this.router.url === '/bamboo';
    isInWoodCharcoal = this.router.url === '/wood-charcoal';
    
    constructor(public router: Router, private firestoreService: FirestoreService) { }
    
    ngOnInit(): void {
        this.readSignatories();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.router.url === '/planted-trees') {
            this.title = "SUMMARY OF CERTIFICATES OF VERIFICATION PERMIT ISSUED"
            this.permitCategory = 'A. Planted Trees';
            this.permitArray = this.plantedTreesPermitArray;
            this.filteredPermitArray = this.plantedTreesFilteredArray;
        } else if (this.router.url === '/bamboo') {
            this.title = "SUMMARY OF CERTIFICATES OF VERIFICATION PERMIT ISSUED"
            this.permitCategory = 'B. Bamboo';
            this.permitArray = this.bambooPermitArray;
            this.filteredPermitArray = this.bambooFilteredArray;
        } else if (this.router.url === '/wood-charcoal') {
            this.title = "SUMMARY OF WOOD CHARCOAL TRANSPORT PERMIT"
            this.permitCategory = 'C. Wood Charcoal';
            this.permitArray = this.woodCharcoalPermitArray;
            this.filteredPermitArray = this.woodCharcoalFilteredArray;
        }
    }

    readSignatories() {
        this.firestoreService.readSignatories("Signatories");
        this.firestoreService.getSignatoriesData().subscribe((fetchSignatoriesArray: any) => {
            this.signatoriesData = fetchSignatoriesArray;
        });
    }
}
