package com.ProyectoSACH.aS.Controller;

import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Service.UsersService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Users> getAllUsers(){
        return usersService.getAllUsers();
    }
    
    @GetMapping("/{id}")
    public Optional<Users> getUsersById(@PathVariable Integer id){
        return usersService.getUsersById(id);
        
    }
    
    @PostMapping
    public Users saveUsuario(@RequestBody Users user){
        return usersService.saveUser(user);
}
    
    
    @PutMapping("/{id}")
    public Users updateUser(@PathVariable Integer id,@RequestBody Users user){
        
        return usersService.updateUser(id, user);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id){
     return ResponseEntity.noContent().build();
    }
}
