
export class NopSerializer implements Serializer {
    fromJson = (x: any) => x;
    toJson = (x: any) => x;
}

export interface Serializer {
    fromJson(json: any): any;
    toJson(resource: any): any;
}
