export interface ManagerProfileType {
    addressProof: null | string;
    attended: boolean;
    consultMethod: null | string;
    createdAt: string;
    dob: string;
    email: string;
    equifaxScore: null | number;
    experianScore: null | number;
    firstName: string;
    govId: null | string;
    id: number;
    lastName: string;
    manager: null | string;
    middleName: null | string;
    phone: string;
    processing: boolean;
    profileImg: null | string;
    referralMethod: null | string;
    refreshDate: null | string;
    roles: { id: number; name: string }[];
    ssn: null | string;
    state: string;
    status: null | string;
    streetAddr: string;
    transunionScore: null | number;
    updatedAt: string;
    zipCode: null | string;
}
  