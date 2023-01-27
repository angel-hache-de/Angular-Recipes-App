export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string, 
        private _tokenExpirationDate: Date
    ) {}
    //Este devuelve el token con user.token, por eso la prop  se llama _token
    get token() //Este getter nos permite user.token y jala solo pa obtener y pa set.
    {   
        if( !this._tokenExpirationDate || new Date() > this._tokenExpirationDate )
            return null;
        
        return this._token;
    }
}