export class Employee {

    constructor(public employeeId: number,
        public firstName: string,
        public lastName: string,
        public fatherName: string,
        public email: string,
        public dateOfBirth: Date,
        public dateOfJoining: Date,
        public department: string,
        public departmentId: number,
        public designation: string,
        public designationId: number,
        public address: string,
        public state: string,
        public stateId: number,
        public city: string,
        public postcode: string,
        public contactNumber: number,
        public gender: String,
        public maritalStatus: any,
        public image: string,
        public bloodGroup: string,
        public bloodGroupId: number,
        public identityType: string,
        public identityTypeId: number,
        public identityNumber: string
    ) { }
}
