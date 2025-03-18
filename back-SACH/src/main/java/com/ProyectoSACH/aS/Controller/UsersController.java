package com.ProyectoSACH.aS.Controller;

import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Repository.ApiResponse;
import com.ProyectoSACH.aS.Service.UsersService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Users saveUsuario(@RequestBody Users user){
        return usersService.saveUser(user);
}
    
    
    @PutMapping("/{id}")
    public Users updateUser(@PathVariable String id,@RequestBody Users user){
        user.setId_users(id);
        return usersService.updateUser(id, user);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id){
        usersService.deleteUser(id);
     return ResponseEntity.noContent().build();
    }
}
