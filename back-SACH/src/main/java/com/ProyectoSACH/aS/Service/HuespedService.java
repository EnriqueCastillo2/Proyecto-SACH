package com.ProyectoSACH.aS.Service;

import com.ProyectoSACH.aS.Model.Huespedes;
import com.ProyectoSACH.aS.Repository.HuespedRepository;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HuespedService {
   
    @Autowired
    private HuespedRepository huespedRepository;
    
    public List<Huespedes> getAllHuespedes(){ 
        return huespedRepository.findAll();
    }
    
    
    public Optional<Huespedes> getHuespedsById(String id){
        return huespedRepository.findById(id);
    }
    
    
    public Huespedes createHuesped(Huespedes huespedes){
        
        if (huespedes.getFechaSalida() != null && huespedes.getFechaSalida().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("La fecha de salida no puede ser menor o igual a la fecha actual");
        }
       
        String generatedId= generateUniqueId(huespedes.getNameHuesped(),huespedes.getApellidoHuesped());
        huespedes.setFechaRegistro(LocalDateTime.now());
        huespedes.setIdHuesped(generatedId);
        return huespedRepository.save(huespedes);
    }
   
    
    public Huespedes updateHuespedes(String id, Huespedes huespedes){
        if (!huespedRepository.existsById(id)){
            throw new EntityNotFoundException("Habitacion no encontrada");
        }
        return huespedRepository.save(huespedes);
    }
    
    public void deleteHuesped(String id){
        huespedRepository.deleteById(id);
    }
    

    public boolean existeHuesped(String id){
          return huespedRepository.existsById(id);
    }
          
    
    private String generateUniqueId(String nombre, String apellido) {
        // Obtener las primeras letras de nombre y apellido
        char firstLetterNombre = nombre.charAt(0);
        char firstLetterApellido = apellido.charAt(0);

        // Generar un número aleatorio
        Random random = new Random();
        int randomNumber = random.nextInt(999);  // Puedes cambiar el rango según lo necesites

        // Crear el ID con las primeras letras y el número aleatorio
        String id = String.valueOf(firstLetterNombre).toUpperCase() +
                    String.valueOf(firstLetterApellido).toUpperCase() +
                    String.format("%04d", randomNumber);  // Asegura que el número tiene 4 dígitos

        // Verificar que el ID sea único
        while (huespedRepository.existsById(id)) {
            randomNumber = random.nextInt(10000);
            id = String.valueOf(firstLetterNombre).toUpperCase() +
                 String.valueOf(firstLetterApellido).toUpperCase() +
                 String.format("%04d", randomNumber);
        }

        return id;
    }
    
    
}

