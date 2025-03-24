package com.ProyectoSACH.aS.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;



@Entity
public class Users {
    @Id

    private String id_users;
    
    private String name;
    
    private String apellido;
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[\\W_]).*$", 
            message = "La contraseña debe contener al menos una letra mayúscula y un signo de puntuación.")
     private String password;
   
    @Enumerated(EnumType.STRING)
    private types.typeUser typeUser;
    
    @NotNull
    @Column(nullable=false)
    private LocalDate fechaIngreso;

    public Users() {
    }

    public Users(String id_users, String name, String apellido, String password, types.typeUser typeUser, LocalDate fechaIngreso) {
        this.id_users = id_users;
        this.name = name;
        this.apellido = apellido;
        this.password = password;
        this.typeUser = typeUser;
        this.fechaIngreso = fechaIngreso;
    }

    

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }
    
    

    public String getId_users() {
        return id_users;
    }

    public void setId_users(String id_users) {
        this.id_users = id_users;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public types.typeUser getTypeUser() {
        return typeUser;
    }

    public void setTypeUser(types.typeUser typeUser) {
        this.typeUser = typeUser;
    }
    
}
