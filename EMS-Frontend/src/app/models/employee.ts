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
        public postCode: number,
        public contactNumber: number,
        public gender: boolean,
        public maritalStatus: boolean,
        public image: File,
        public bloodGroup: string,
        public identityType: string,
        public identityNumber: string) { }
}
