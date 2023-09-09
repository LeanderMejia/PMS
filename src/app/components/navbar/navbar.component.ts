import { Component, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignatoriesData } from 'src/app/model/signatories-data';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    private isWindowClosing = false;
    
    plantedTreesLinkStyle = { color: this.router.url == '/planted-trees' ? '#A1BBFC' : '#7C7C7D' };
    bambooLinkStyle = { color: this.router.url == '/bamboo' ? '#A1BBFC' : '#7C7C7D' };
    woodCharcoaLinklStyle = { color: this.router.url == '/wood-charcoal' ? '#A1BBFC' : '#7C7C7D' };
    signatoriesData: any = [];
    signatoriesUpdateFormData: any = [];
    SignatoriesDataModel: SignatoriesData;

    @ViewChild('cancelButton') cancelButton: any;

    constructor(private auth: Auth, private router: Router, private firestoreService: FirestoreService) {
        this.SignatoriesDataModel = new SignatoriesData(this.signatoriesUpdateFormData.rps_staff_position, this.signatoriesUpdateFormData.rps_staff_name, this.signatoriesUpdateFormData.chief_rps_position, this.signatoriesUpdateFormData.chief_rps_name, this.signatoriesUpdateFormData.cenro_position, this.signatoriesUpdateFormData.cenro_name);
    }

    ngOnInit(): void {
        window.onbeforeunload = () => {
            this.isWindowClosing = true;
        }        
        window.onunload = () => {
            this.onSignOut();
        }
        this.readSignatories();
    }

    onSignOut() {
        this.auth.signOut();
        this.router.navigate(['']);
    }

    readSignatories() {
        this.firestoreService.readSignatories("Signatories");
        this.firestoreService.getSignatoriesData().subscribe((fetchSignatoriesArray: any) => {
            this.signatoriesData = fetchSignatoriesArray;
        });
    }

    displaySignatoriesModal(permitData: any) {
        const updateData = this.firestoreService.getUpdateSignatoriesData(this.signatoriesUpdateFormData, permitData);
        this.signatoriesUpdateFormData = updateData;
    }

    updateSignatories(form: NgForm) {
        this.SignatoriesDataModel = new SignatoriesData(this.signatoriesUpdateFormData.rps_staff_position.trim(), this.signatoriesUpdateFormData.rps_staff_name.trim(), this.signatoriesUpdateFormData.chief_rps_position.trim(), this.signatoriesUpdateFormData.chief_rps_name.trim(), this.signatoriesUpdateFormData.cenro_position.trim(), this.signatoriesUpdateFormData.cenro_name.trim());
        
        if (this.SignatoriesDataModel.hasEmptyValues()) {
            alert("Error! Please make sure all fields are filled up.");
            return;
        }
        
        const response = confirm("Are you sure want to update this data?");
        if (response) {
            this.firestoreService.updateData("Signatories", "KlV0e5Tov65eXgbGHAG9", this.SignatoriesDataModel.toJSON());
            this.cancelButton.nativeElement.click();
        }
    }
}
