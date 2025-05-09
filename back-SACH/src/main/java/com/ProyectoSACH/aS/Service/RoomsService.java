package com.ProyectoSACH.aS.Service;

import com.ProyectoSACH.aS.Model.Rooms;
import com.ProyectoSACH.aS.Model.types;
import com.ProyectoSACH.aS.Repository.RoomsRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomsService {
    
    @Autowired
    private RoomsRepository roomsRespository;
    
     
    public List<Rooms> getRooms(){
        return roomsRespository.findAll();
    }
    
    public Optional<Rooms> getRoomsById(Integer id){
        return roomsRespository.findById(id);
    }
    
    public Rooms createRooms(Rooms rooms){
       
        return roomsRespository.save(rooms);
    }
    
    public Rooms updateRooms(Integer id,Rooms rooms){
        if (!roomsRespository.existsById(id)) {
            throw new EntityNotFoundException("Habitacion no encontrada"); 
        }
  
        return roomsRespository.save(rooms);
        
        
    }
    
    public void deleteRooms(Integer id){
        roomsRespository.deleteById(id);
    }
    
    public boolean existeRoom(Integer id){
        return roomsRespository.existsById(id);
    }


    public Rooms actualizarEstado(Integer id, String nuevoEstado) {
        Rooms room = roomsRespository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Habitación no encontrada con ID: " + id));

        try {
            types.typesRooms_Status estadoEnum = types.typesRooms_Status.valueOf(nuevoEstado.toLowerCase());
            room.setEstado(estadoEnum);
            return roomsRespository.save(room);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Estado no válido: " + nuevoEstado);
        }
    }


}
