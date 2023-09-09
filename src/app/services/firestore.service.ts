import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, setDoc } from '@angular/fire/firestore';
import { orderBy, query } from '@firebase/firestore';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    db = getFirestore();
    fetchPermitArray: any[] = [];
    permitArraySubject = new Subject<any[]>();
    fetchPrintArray: any[] = [];
    printPermitArraySubject = new Subject<any[]>();
    fetchSignatories: any;
    signatoriesSubject = new Subject<any>();

    constructor() { }

    // CREATE DATA IN FIRESTORE
    createData(collectionName: string, data: any) {
        const ref = doc(collection(this.db, collectionName));
        setDoc(ref, data.toJSON());
    }

    // READ DATA IN FIRESTORE
    async queryPermitByDate(collectionName: string, sortValue: any, array: any, subject: any) {
        const queryByDateIssued = query(collection(this.db, collectionName), orderBy("date_issued", sortValue));
        onSnapshot(queryByDateIssued, (querySnapshot) => {
            array = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    date_issued: data['date_issued'].toDate(),
                    date_expired: data['date_expired'].toDate()
                };
            });
            subject.next(array);
        });
    }

    getPermitData() {
        return this.permitArraySubject.asObservable()
    }

    async readData(collectionName: string) {
        this.queryPermitByDate(collectionName, "desc", this.fetchPermitArray, this.permitArraySubject);
    }

    getPrintPermitData() {
        return this.printPermitArraySubject.asObservable()
    }

    async readPrintPermitData(collectionName: string) {
        this.queryPermitByDate(collectionName, "asc", this.fetchPrintArray, this.printPermitArraySubject);
    }

    querySignatoriesByLevel(collectionName: string, array: any, subject: any) {
        const doc = collection(this.db, collectionName);
        onSnapshot(doc, (querySnapshot) => {
            let data = { };
            for (const doc of querySnapshot.docs) {
                data = { ...data, ...doc.data() };
            }
            subject.next(data);
        });
    }

    getSignatoriesData() {
        return this.signatoriesSubject.asObservable()
    }

    async readSignatories(collectionName: string) {
        this.querySignatoriesByLevel(collectionName, this.fetchSignatories, this.signatoriesSubject);
    }

    // UPDATE DATA IN FIRESTORE
    getUpdatePermitData(updateDataArr: any, permitData: any) {
        updateDataArr = { ...permitData };
        const dateIssued = new Date(updateDataArr.date_issued);
        const ddDateIssued = String(dateIssued.getDate()).padStart(2, '0');
        const mmDateIssued = String(dateIssued.getMonth() + 1).padStart(2, '0');
        const yyyyDateIssued = dateIssued.getFullYear();
        const date_issued = `${yyyyDateIssued}-${mmDateIssued}-${ddDateIssued}`;

        const dateExpired = new Date(updateDataArr.date_expired);
        const ddDateExpired = String(dateExpired.getDate()).padStart(2, '0');
        const mmDateExpired = String(dateExpired.getMonth() + 1).padStart(2, '0');
        const yyyyDateExpired = dateExpired.getFullYear();
        const date_expired = `${yyyyDateExpired}-${mmDateExpired}-${ddDateExpired}`;

        return { updateDataArr, date_issued, date_expired };
    }

    getUpdateSignatoriesData(updateDataArr: any, permitData: any) {
        updateDataArr = { ...permitData };
        return updateDataArr;
    }

    async updateData(collectionName: string, documentID: string, data: any) { 
        const ref = doc(this.db, collectionName, documentID);
        await setDoc(ref, data);
    }
    
    // DELETE DATA IN FIRESTORE
    async deleteData(collectionName: string, documentID: string) { 
        await deleteDoc(doc(this.db, collectionName, documentID));
    } 
}
