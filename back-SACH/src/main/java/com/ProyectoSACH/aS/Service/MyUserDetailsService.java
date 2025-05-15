
package com.ProyectoSACH.aS.Service;

import com.ProyectoSACH.aS.Model.Users;
import com.ProyectoSACH.aS.Repository.UsersRepository;
import java.util.ArrayList;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 * @author flavi
 */
@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UsersRepository usersRepository;
    

    public MyUserDetailsService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       
        Users user = usersRepository.findByName(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Aquí mapeamos tu entidad Users a UserDetails (sin roles, vacío)
        return new org.springframework.security.core.userdetails.User(
                user.getName(),
                user.getPassword(),
                new ArrayList<>() // sin roles/authorities por ahora
        );
        
    }
}

