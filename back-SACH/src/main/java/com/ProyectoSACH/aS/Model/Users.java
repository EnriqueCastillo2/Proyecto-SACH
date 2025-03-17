package com.ProyectoSACH.aS.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "Users") // Personaliza el nombre de la tabla
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
    @Id
//    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id_users;
    
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
    private tipoUsuario typeUser;
    
    
    
}

