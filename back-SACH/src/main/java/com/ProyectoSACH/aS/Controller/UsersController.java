package com.ProyectoSACH.aS.Controller;

import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Repository.ApiResponse;
import com.ProyectoSACH.aS.Service.UsersService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
public class UsersController {
    
    @Autowired
    private UsersService usersService;
    
    @GetMapping
    public ResponseEntity<Object> getAllUsers(){
        List<Users> users= usersService.getAllUsers();
        if(users.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("No se encontraron usuarios",HttpStatus.NOT_FOUND.value(),null));
        }
        
        return ResponseEntity.status(HttpStatus.OK)
                .body(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> getUsersById(@PathVariable String id){
        Optional<Users> user= usersService.getUsersById(id);
        if(user.isPresent()){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(user);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Usuario no encotrado",HttpStatus.NOT_FOUND.value(),null));
        }
        
    }
    
    @PostMapping
    public ResponseEntity<Object> saveUsuario(@RequestBody Users user){

        Users savedUser= usersService.saveUser(user);
       return ResponseEntity.status(HttpStatus.CREATED)
               .body(savedUser);
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable String id,@RequestBody Users user){
        
        Optional<Users>existeingUser=usersService.getUsersById(id);
        if(!existeingUser.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Usuario no encontrado", HttpStatus.NOT_FOUND.value(), null));
        }
        user.setId_users(id);
        try {
            Users updateUser=usersService.updateUser(id, user);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Error en la solicitud de actualizacion: "
                            +e.getMessage(),HttpStatus.BAD_REQUEST.value(),null));
        }
    }
    
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable String id){
        Optional<Users> existingUser=usersService.getUsersById(id);
        if(!existingUser.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Usuario no Econtrado", HttpStatus.NOT_FOUND.value(), null));
        }
        try {
            usersService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse("Usuario eliminado con exito", HttpStatus.NO_CONTENT.value(), null));
              } 
        catch (DataAccessException e) { // Ejemplo de excepción específica
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error al eliminar usuario: " + e.getMessage(), 
                        HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error al eliminar cliente"+e.getMessage(), 
                            HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }
}
