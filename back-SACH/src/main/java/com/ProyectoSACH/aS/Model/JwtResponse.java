package com.ProyectoSACH.aS.Model;

public class JwtResponse {

    private final String token;
    private final String idUser;
    private final types.typeUser Rol;
    
    public JwtResponse(String token,String idUser, types.typeUser Rol) {
        this.token = token;
        this.idUser = idUser;
        this.Rol = Rol;
    }
    public String getIdUser() {
        return idUser;
    }

    public types.typeUser getRol() {
        return Rol;
    }

    public String getToken(){
        return token;
    }
}
