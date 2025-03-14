import { ISecurity } from "./security.interface";

export interface IIdentityOptions {
    allowSignInDiscovery?: boolean;
    security?: ISecurity;
    serviceUrl: string;    
}