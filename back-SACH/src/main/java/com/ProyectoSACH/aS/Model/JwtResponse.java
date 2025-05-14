package com.ProyectoSACH.aS.Model;

public class JwtResponse {

    private final String token;

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken(){
        return token;
    }
}
