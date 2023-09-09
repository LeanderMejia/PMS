export class BambooData {
    private _applicantName: string;
    private _typeOfPermit: string;
    private _speciesCutHarvest: string;
    private _noOfPieces: string;
    private _dateIssued: Date;
    private _dateExpired: Date;
    private _address: string;

    constructor(applicantName: string, typeOfPermit: string, speciesCutHarvest: string, noOfPieces: string, dateIssued: Date, dateExpired: Date, address: string) {
        this._applicantName = applicantName
        this._typeOfPermit = typeOfPermit
        this._speciesCutHarvest = speciesCutHarvest
        this._noOfPieces = noOfPieces
        this._dateIssued = dateIssued
        this._dateExpired = dateExpired
        this._address = address
    }

    hasEmptyValues(): boolean {
        for (const key in this) {
            if (this[key] === undefined || this[key] === null || this[key] === '' || this[key] == 'Invalid Date' || this[key] == 'Invalid Date') {
                return true;
            }
        }

        return false;
    }

    toJSON() {
        return {
            applicant_name: this._applicantName,
            type_of_permit: this._typeOfPermit,
            species_cut_harvest: this._speciesCutHarvest,
            no_of_pieces: this._noOfPieces,
            date_issued: this._dateIssued,
            date_expired: this._dateExpired,
            address: this._address
        }
    }
}