export interface EventReq {
    eventType: number;
    creator: number;
    name: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
    startTime: string;
    endTime: string;
    phoneNumber: string;
}

export interface JoinReq {
    userId: number;
    eventId: number;
    status: number;
}