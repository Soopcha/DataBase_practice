// Конструктор, формирующий поля класса по объекту JSON
class Vrachik {
    constructor(obj) {
        this.VRid = obj.VRid;
        this.exp = obj.exp;
        this.patient = obj.patient;
    }
    print() {
        console.log(this.to_string());
    }
    to_string() {
        return "Id: " + this.VRid + ", EXPERIENCE: " + this.exp + ", QUALIFICATION: " + this.patient;
    }
    to_table_entry() {
        return '<tr><td>' +
            this.VRid + '</td><td>' +
            this.exp + '</td><td>' +
            this.patient + '</td><td>';
    }
};