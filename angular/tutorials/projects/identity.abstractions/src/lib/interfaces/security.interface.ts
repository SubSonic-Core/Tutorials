export interface ISecurity {
    /**
     * array of allowed hosts
     * ie: *.subsonic-core.net|subsonic-finance.com
     * 
     * note: this pipe list of urls is transformed into regular expression to evaluate 
     * if the access token should be appended to the request.
     */
    allowed: Array<string>;

    requireHttps: boolean;
}