export class WoodCharcoalData {
    private _applicantName: string;
    private _WCTPNo: string;
    private _speciesHarvest: string;
    private _noOfSacks: string;
    private _dateIssued: Date;
    private _dateExpired: Date;
    private _address: string;

    constructor(applicantName: string, WCTPNo: string, speciesHarvest: string, noOfSacks: string, dateIssued: Date, dateExpired: Date, address: string) {
        this._applicantName = applicantName
        this._WCTPNo = WCTPNo
        this._speciesHarvest = speciesHarvest
        this._noOfSacks = noOfSacks
        this._dateIssued = dateIssued
        this._dateExpired = dateExpired
        this._address = address
    }

    hasEmptyValues(): boolean {
        for (const key in this) {
            if (this[key] === undefined || this[key] === null || this[key] === '' || this[key] == 'Invalid Date') {
                return true;
            }
        }
        return false;
    }

    toJSON() {
        return {
            applicant_name: this._applicantName,
            wctp_no: this._WCTPNo,
            species_harvest: this._speciesHarvest,
            no_of_sacks: this._noOfSacks,
            date_issued: this._dateIssued,
            date_expired: this._dateExpired,
            address: this._address
        }
    }
}