package com.ProyectoSACH.aS.Service;

import com.ProyectoSACH.aS.Model.Users;

import com.ProyectoSACH.aS.Repository.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    
     @Autowired
    private AllServices allServices;
    @Autowired
    private UsersRepository usersRepository;
    
    public List<Users> getAllUsers(){
        
       return usersRepository.findAll();
    }
    
    public Optional<Users> getUsersById(String id){
        return usersRepository.findById(id);
    }
    
    
    public Users saveUser( @Valid Users user) {
        
        String generatedId= generateUniqueId(user.getName(),user.getApellido());
        user.setId_users(generatedId);
        
         if (user.getImagenBase64() != null && !user.getImagenBase64().isEmpty()) {
            // Llamar al método para guardar la imagen y obtener la ruta
            String imagePath = allServices.saveImageFromBase64(user.getImagenBase64(),user.getId_users());
            // Establecer la ruta de la imagen en el objeto User
            user.setImagenBase64(imagePath);
        }
        user.setFechaIngreso(LocalDate.now());
        return usersRepository.save(user);
    }
    
    
    public Users updateUser(String id, Users user) {
    if (!usersRepository.existsById(id)) {
        throw new EntityNotFoundException("Usuario no encontrado");
    }

    user.setId_users(id);

    String imagen = user.getImagenBase64();

    // Si viene base64 limpio (no termina en .png), la guardamos
    if (imagen != null && !imagen.isEmpty() && !imagen.endsWith(".png")) {
        try {
            String nuevaRuta = allServices.saveImageFromBase64(imagen, id);
            user.setImagenBase64(nuevaRuta);
        } catch (Exception e) {
            throw new IllegalArgumentException("Error al guardar imagen desde base64: " + e.getMessage());
        }
    }

    user.setFechaIngreso(LocalDate.now());

    return usersRepository.save(user);
}
    
    public void deleteUser(String id){
        usersRepository.deleteById(id);
    }
    
    public boolean existeUsuario(String id){
        return usersRepository.existsById(id);
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
