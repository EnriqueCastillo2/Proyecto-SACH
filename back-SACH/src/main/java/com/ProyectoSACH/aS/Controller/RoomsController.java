package com.ProyectoSACH.aS.Controller;

import com.ProyectoSACH.aS.Model.Rooms;
import com.ProyectoSACH.aS.Repository.ApiResponse;
import com.ProyectoSACH.aS.Service.RoomsService;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("rooms")
public class RoomsController {
    
    @Autowired
    private RoomsService roomsService;
    
    @GetMapping
    public ResponseEntity<Object> getAllRooms(){
        List<Rooms> rooms= roomsService.getRooms();
        if(rooms.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("No hay habitaciones Registradas", HttpStatus.NOT_FOUND.value(), null));
        }
         
        return ResponseEntity.status(HttpStatus.OK)
                .body(rooms);          
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> getRoomsById(@PathVariable Integer id){
        Optional<Rooms> rooms=roomsService.getRoomsById(id);
        if(rooms.isPresent()){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(rooms);
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse("Habitacion no encontrada", HttpStatus.NOT_FOUND.value(), null));
    }
    
    
    @PostMapping
    public ResponseEntity<Object> createRooms(@RequestBody Rooms room){
        if(roomsService.existeRoom(room.getId_Rooms())){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse("La habitaciono ya existe", HttpStatus.CONFLICT.value(), null));
        }
        Rooms saveRoom=roomsService.createRooms(room);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveRoom);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateRooms(@PathVariable Integer id, @RequestBody Rooms rooms){
        Optional<Rooms> existingrooms=roomsService.getRoomsById(id);
        if(!existingrooms.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Esta Habitacion no existe", HttpStatus.NOT_FOUND.value(), null));
            
        }
        rooms.setId_Rooms(id);
        try {
            Rooms updateRooms=roomsService.updateRooms(id, rooms);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(updateRooms);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Error en la Actualizacin del Servidor", 
                            HttpStatus.BAD_REQUEST.value(), null));
        }
    }
     @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteRooms(@PathVariable Integer id){
        Optional<Rooms>existeRooms=roomsService.getRoomsById(id);
        if(!existeRooms.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Usuario no encontrado",HttpStatus.NOT_FOUND.value(), null));
            
        }
        roomsService.deleteRooms(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body( new ApiResponse("Usuario Eliminado Con exito",HttpStatus.NO_CONTENT.value(), null));

    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        String estado = body.get("estado");
        if (estado == null || estado.isEmpty()) {
            return ResponseEntity.badRequest().body("El campo 'estado' es requerido.");
        }

        try {
            Rooms roomActualizada = roomsService.actualizarEstado(id, estado);
            return ResponseEntity.ok(roomActualizada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
