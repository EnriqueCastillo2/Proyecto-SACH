package com.ProyectoSACH.aS.Service;

import com.ProyectoSACH.aS.GlobalExceptionHandler.ResourceNotFoundException;
import com.ProyectoSACH.aS.Model.Rooms;
import com.ProyectoSACH.aS.Model.types;
import com.ProyectoSACH.aS.Repository.RoomsRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class RoomsService {
    

    private final RoomsRepository roomsRespository;

    public RoomsService(RoomsRepository roomsRespository) {
        this.roomsRespository = roomsRespository;
    }


    public List<Rooms> getRooms(){
        List<Rooms> rooms= roomsRespository.findAll();
        if(rooms.isEmpty()){
            throw new ResourceNotFoundException("No se encontraron habitaciones");
        }
        return roomsRespository.findAll();
    }
    
    public Rooms getRoomsById(Integer id){
        return roomsRespository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Habitacion no encontrada", id)); }

    
    public Rooms createRooms(Rooms rooms){return roomsRespository.save(rooms);}

    
    public Rooms updateRooms(Integer id,Rooms rooms){
       getRoomsById(id);
       return roomsRespository.save(rooms);
    }
    
    public void deleteRooms(Integer id){
        roomsRespository.deleteById(id);
        try {roomsRespository.deleteById(id);
        }catch (DataIntegrityViolationException ex){
            throw new ResourceNotFoundException("No se puede eliminar la habitacion debido a que esta relacionada" +
                    "con un huesped");
        }
    }
    



    public Rooms actualizarEstado(Integer id, String nuevoEstado) {
        Rooms room = getRoomsById(id);

        try {
            types.typesRooms_Status estadoEnum = types.typesRooms_Status.valueOf(nuevoEstado.toLowerCase());
            room.setEstado(estadoEnum);
            return roomsRespository.save(room);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Estado no válido: " + nuevoEstado);
        }
    }


}
