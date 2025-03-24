
package com.ProyectoSACH.aS.Controller;

import com.ProyectoSACH.aS.Model.Huespedes;
import com.ProyectoSACH.aS.Repository.ApiResponse;
import com.ProyectoSACH.aS.Service.HuespedService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
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
@RequestMapping("huesped")
public class HuespedController {
    
    @Autowired
    private HuespedService huespedService;
    
    
    @GetMapping
    public ResponseEntity<Object> getAllHuesped(){
        List<Huespedes> huesped= huespedService.getAllHuespedes();
        if(huesped.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Huesped´s no encontrados", HttpStatus.NOT_FOUND.value(), null));
        
        }
        
        return ResponseEntity.status(HttpStatus.OK)
                .body(huesped);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Object> getHuespedById(@PathVariable String id){
        Optional<Huespedes> huespedes=huespedService.getHuespedsById(id);
        if (huespedes.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(huespedes);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse("Huesped no encontrado", HttpStatus.NOT_FOUND.value()
                        , null));
    }
    @PostMapping
   public ResponseEntity<Object> createHuesped(@RequestBody Huespedes huesped){
       
       
        Huespedes saveHuesped=huespedService.createHuesped(huesped);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveHuesped);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable String id,@RequestBody Huespedes huesped){
        
        Optional<Huespedes>existeingHuesped=huespedService.getHuespedsById(id);
        if(!existeingHuesped.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Huesped no encontrado", HttpStatus.NOT_FOUND.value(), null));
        }
        huesped.setIdHuesped(id);
        try {
          
            Huespedes updateHuesped =huespedService.updateHuespedes(id, huesped);
            return ResponseEntity.status(HttpStatus.OK).body(updateHuesped);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Error en la solicitud de actualizacion: "
                            +e.getMessage(),HttpStatus.BAD_REQUEST.value(),null));
        }
    }
  
     @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable String id){
        Optional<Huespedes> existingUser=huespedService.getHuespedsById(id);
        if(!existingUser.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("Huesped no Econtrado", HttpStatus.NOT_FOUND.value(), null));
        }
        try {
            huespedService.deleteHuesped(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse("Huesped eliminado con exito", HttpStatus.NO_CONTENT.value(), null));
              } 
        catch (DataAccessException e) { // Ejemplo de excepción específica
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("Error al eliminar huesped: " + e.getMessage(), 
                        HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error al eliminar cliente"+e.getMessage(), 
                            HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }
    
    
}
