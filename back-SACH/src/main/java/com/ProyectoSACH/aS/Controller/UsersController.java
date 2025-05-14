package com.ProyectoSACH.aS.Controller;

import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Service.UsersService;
import java.util.List;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("users")
public class UsersController {


    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }


    @GetMapping
    public List<Users>  getAllUsers() {
        List<Users> users = usersService.getAllUsers();
        String baseUrl = "http://localhost:8080/uploads/";

        // Modificar solo la propiedad de la imagen y mantener el resto del usuario intacto
        users.forEach(user -> {
            if (user.getImagenBase64() != null && !user.getImagenBase64().isEmpty()) {
                user.setImagenBase64(baseUrl + user.getImagenBase64());
            }
        });

        return usersService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Users getUsersById(@PathVariable String id) {return  usersService.findUserById(id);}


    @PostMapping
    @ResponseStatus( HttpStatus.CREATED)
    public Users saveUsuario(@Valid @RequestBody Users user) { return usersService.saveUser(user); }


    @PutMapping("/{id}")
    public Users updateUser(@PathVariable String id, @RequestBody Users user)
    {return  usersService.updateUser(id,user);}


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id) {usersService.deleteUser(id);}
}
