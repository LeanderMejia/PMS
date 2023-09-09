export class SignatoriesData {

    private _rpsStaffPosition: string;
    private _rpsStaffName: string;
    private _chiefRpsPosition: string;
    private _chiefRpsName: string;
    private _cenroPosition: string;
    private _cenroName: string;

    constructor(rpsStaffPosition: string, rpsStaffName: string, chiefRpsPosition: string, chiefRpsName: string, cenroPosition: string, cenroName: string) {
        this._rpsStaffPosition = rpsStaffPosition
        this._rpsStaffName = rpsStaffName
        this._chiefRpsPosition = chiefRpsPosition
        this._chiefRpsName = chiefRpsName
        this._cenroPosition = cenroPosition
        this._cenroName = cenroName
    }

    hasEmptyValues(): boolean {
        for (const key in this) {
            if (this[key] === undefined || this[key] === null || this[key] === '') {
                return true;
            }
        }
        return false;
    }

    toJSON() {
        return {
            rps_staff_position: this._rpsStaffPosition,
            rps_staff_name: this._rpsStaffName,
            chief_rps_position: this._chiefRpsPosition,
            chief_rps_name: this._chiefRpsName,
            cenro_position: this._cenroPosition,
            cenro_name: this._cenroName,
        }
    }
}