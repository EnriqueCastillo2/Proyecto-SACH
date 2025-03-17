package com.ProyectoSACH.aS.Service;

import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Model.tipoUsuario;
import com.ProyectoSACH.aS.Repository.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    
    @Autowired
    private UsersRepository usersRepository;
    
    public List<Users> getAllUsers(){
       return usersRepository.findAll();
    }
    
    public Optional<Users> getUsersById(Integer id){
        return usersRepository.findById(id);
    }
    
    public Users saveUser(@Valid Users user){
     
        return usersRepository.save(user);
    }
    
    public Users updateUser(Integer id, Users user) {
        if (!usersRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuario no encontrado");
        }
        user.setName(user.getName());
        user.setApellido(user.getApellido());
        user.setPassword(user.getPassword());
        user.setTypeUser(tipoUsuario.user);
        
        return usersRepository.save(user);
    }
    
    
    public void deleteUser(Integer id){
        usersRepository.deleteById(id);
    }
    
}
