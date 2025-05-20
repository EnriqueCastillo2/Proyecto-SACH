package com.ProyectoSACH.aS.Controller;

import com.ProyectoSACH.aS.Config.JwtUtil;
import com.ProyectoSACH.aS.Model.JwtResponse;
import com.ProyectoSACH.aS.Model.LoginRequest;
import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Model.types;
import com.ProyectoSACH.aS.Repository.UsersRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")

public class AuthController {

   
  
    private final UsersRepository usersRepository;

  
    private  final JwtUtil jwtUtil;
    
     public AuthController(UsersRepository usersRepository,JwtUtil jwtUtil) {
        this.usersRepository = usersRepository;
        this.jwtUtil=jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Users user = usersRepository.findByName(request.getUsername())
                .orElse(null);

        if (user == null || !user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        String token = jwtUtil.generateToken(user.getName());
        String idUser= user.getId_users();
        types.typeUser Rol=user.getTypeUser();
        return ResponseEntity.ok(new JwtResponse(token,idUser,Rol));
    }
}
