package com.ProyectoSACH.aS.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;



@Entity
@Table(name = "Users") // Personaliza el nombre de la tabla

public class Users {
    @Id
//    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private String id_users;
    
    private String name;
    
    private String apellido;
    //pendiente: manejar la excepcion en caso de que la contraseña no sea correcta
    //buscar en chat el manejo de esta excepcion; ejecutar el comando para la validacion en la base de datos
    // La expresión regular ^(?=.*[A-Z])(?=.*[\\W_]).*$ asegura que:
    //(?=.*[A-Z]) haya al menos una letra mayúscula.
    //(?=.*[\\W_]) haya al menos un carácter de puntuación o carácter especial (esto incluye caracteres no alfanuméricos y guiones bajos).
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[\\W_]).*$", 
            message = "La contraseña debe contener al menos una letra mayúscula y un signo de puntuación.")
     private String password;
   
    @Enumerated(EnumType.STRING)
    private types.typeUser typeUser;

    public Users() {
    }

    public Users(String id_users, String name, String apellido, String password, types.typeUser typeUser) {
        this.id_users = id_users;
        this.name = name;
        this.apellido = apellido;
        this.password = password;
        this.typeUser = typeUser;
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
