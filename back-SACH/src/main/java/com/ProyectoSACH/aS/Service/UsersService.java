package com.ProyectoSACH.aS.Service;

import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Model.types;

import com.ProyectoSACH.aS.Repository.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    
    @Autowired
    private UsersRepository usersRepository;
    
    public List<Users> getAllUsers(){
       return usersRepository.findAll();
    }
    
    public Optional<Users> getUsersById(String id){
        return usersRepository.findById(id);
    }
    
    
    public Users saveUser(@Valid Users user){
        String generatedId= generateUniqueId(user.getName(),user.getApellido());
        user.setId_users(generatedId);
        return usersRepository.save(user);
    }
    
    public Users updateUser(String id, Users user) {
        if (!usersRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuario no encontrado");
        }
        user.setName(user.getName());
        user.setApellido(user.getApellido());
        user.setPassword(user.getPassword());
        user.setTypeUser(types.typeUser.user);
        
        return usersRepository.save(user);
    }
    
    
    public void deleteUser(String id){
        usersRepository.deleteById(id);
    }
    
    //metodo para crear Id
    private String generateUniqueId(String nombre, String apellido) {
        // Obtener las primeras letras de nombre y apellido
        char firstLetterNombre = nombre.charAt(0);
        char firstLetterApellido = apellido.charAt(0);

        // Generar un número aleatorio
        Random random = new Random();
        int randomNumber = random.nextInt(100);  // Puedes cambiar el rango según lo necesites

        // Crear el ID con las primeras letras y el número aleatorio
        String id = String.valueOf(firstLetterNombre).toUpperCase() +
                    String.valueOf(firstLetterApellido).toUpperCase() +
                    String.format("%04d", randomNumber);  // Asegura que el número tiene 4 dígitos

        // Verificar que el ID sea único
        while (usersRepository.existsById(id)) {
            randomNumber = random.nextInt(10000);
            id = String.valueOf(firstLetterNombre).toUpperCase() +
                 String.valueOf(firstLetterApellido).toUpperCase() +
                 String.format("%04d", randomNumber);
        }

        return id;
    }
    
}
