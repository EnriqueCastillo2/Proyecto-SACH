package com.ProyectoSACH.aS.Controller;

import com.ProyectoSACH.aS.Model.Rooms;
import com.ProyectoSACH.aS.Service.RoomsService;
import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("rooms")
public class RoomsController {
    
    @Autowired
    private RoomsService roomsService;
    
    @GetMapping
    public  List<Rooms> getAllRooms(){return roomsService.getRooms(); }
    
    @GetMapping("/{id}")
    public Rooms getRoomsById(@PathVariable Integer id){return roomsService.getRoomsById(id); }
    
    
    @PostMapping
    @ResponseStatus( HttpStatus.CREATED)
    public Rooms createRooms(@RequestBody Rooms room){ return roomsService.createRooms(room);

    }
    
    @PutMapping("/{id}")
    public Rooms updateRooms(@PathVariable Integer id, @RequestBody Rooms rooms) {
        return roomsService.updateRooms(id,rooms);
    }



     @DeleteMapping("/{id}")
     @ResponseStatus(HttpStatus.NO_CONTENT)
        public void deleteRooms(@PathVariable Integer id){
        roomsService.deleteRooms(id);
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
