
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
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("huesped")
public class HuespedController {
    

    private final HuespedService huespedService;

    public HuespedController(HuespedService huespedService) {
        this.huespedService = huespedService;
    }


    @GetMapping
    public List<Huespedes> getAllHuesped(){return huespedService.getAllHuespedes();}
    
    
    @GetMapping("/{id}")
    public Huespedes getHuespedById(@PathVariable String id){return huespedService.getHuespedsById(id);}


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Huespedes createHuesped(@RequestBody Huespedes huesped){return huespedService.createHuesped(huesped);}

    
    @PutMapping("/{id}")
    public Huespedes updateUser(@PathVariable String id,@RequestBody Huespedes huesped){
        return huespedService.updateHuespedes(id,huesped);
    }


     @DeleteMapping("/{id}")
     @ResponseStatus(HttpStatus.NO_CONTENT)
     public void deleteUser(@PathVariable String id){ huespedService.deleteHuesped(id);
    }

}
