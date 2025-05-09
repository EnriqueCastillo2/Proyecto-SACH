export interface User {
    imagenBase64:   string, 
    id_users:       string,
    name:           string,
    apellido:       string,
    password:       string,
    typeUser:       TypeUser,
    fechaIngreso:   Date
    }


export enum TypeUser {
    ADMIN = 'admin',
    USER =  'user'
}

