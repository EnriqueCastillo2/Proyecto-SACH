package com.ProyectoSACH.aS.Service;

import com.ProyectoSACH.aS.GlobalExceptionHandler.ResourceNotFoundException;
import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Repository.UsersRepository;
import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;


@Service
public class UsersService {

    private final AllServices allServices;
    private final UsersRepository usersRepository;

    public UsersService(AllServices allServices, UsersRepository usersRepository) {
        this.allServices = allServices;
        this.usersRepository = usersRepository;
    }


    public List<Users> getAllUsers() {
        List<Users> users = usersRepository.findAll();
        if (users.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron usuarios");
        }

        return usersRepository.findAll();
    }

    public Users findUserById(String id) {
        return usersRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Usuario no encontrado", id));
    }


    public Users saveUser(@Valid Users user) {
        String generatedId = generateUniqueId(user.getName(), user.getApellido());
        user.setId_users(generatedId);

        if (user.getImagenBase64() != null && !user.getImagenBase64().isEmpty()) {
            String imagePath = allServices.saveImageFromBase64(user.getImagenBase64(), user.getId_users());
            user.setImagenBase64(imagePath);
        }
        user.setFechaIngreso(LocalDate.now());
        return usersRepository.save(user);
    }


    public Users updateUser(String id, Users user) {
        findUserById(id);

        user.setId_users(id);
        String imagen = user.getImagenBase64();

        if (imagen != null && !imagen.isEmpty() && !imagen.endsWith(".png")) {
            try {
                String nuevaRuta = allServices.saveImageFromBase64(imagen, id);
                user.setImagenBase64(nuevaRuta);
            } catch (Exception e) {
                throw new IllegalArgumentException("Error al guardar la imagen desde Base64: " + e.getMessage());
            }
        }

        user.setFechaIngreso(LocalDate.now());
        return usersRepository.save(user);
    }


    public void deleteUser(String id) {
        findUserById(id);
        try {usersRepository.deleteById(id);
        }catch (DataIntegrityViolationException ex){
            throw new ResourceNotFoundException("No se puede eliminar al usuario debido a que esta relacionado" +
                    "con un huesped");
        }
    }



    private String generateUniqueId(String nombre, String apellido) {
        char firstLetterNombre = nombre.charAt(0);
        char firstLetterApellido = apellido.charAt(0);

        Random random = new Random();
        int randomNumber = random.nextInt(100);

        String id = String.valueOf(firstLetterNombre).toUpperCase() + String.valueOf(firstLetterApellido).toUpperCase()
                + String.format("%04d", randomNumber);

        while (usersRepository.existsById(id)) {
            randomNumber = random.nextInt(10000);
            id = String.valueOf(firstLetterNombre).toUpperCase() + String.valueOf(firstLetterApellido).toUpperCase()
                    + String.format("%04d", randomNumber);
        }

        return id;
    }
}

