export class Employee {

    constructor(public employeeId: number,
        public firstName: string,
        public lastName: string,
        public fatherName: string,
        public email: string,
        public dateOfBirth: Date,
        public dateOfJoining: Date,
        public department: string,
        public designation: string,
        public address: string,
        public state: string,
        public city: string,
        public postcode: string,
        public contactNumber: number,
        public gender: String,
        public maritalStatus: boolean,
        public image: string,
        public bloodGroup: string,
        public identityType: string,
        public identityNumber: string
    ) { }
}
