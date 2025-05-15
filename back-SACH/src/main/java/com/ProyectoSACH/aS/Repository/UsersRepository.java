package com.ProyectoSACH.aS.Repository;

import com.ProyectoSACH.aS.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users,String> {

    Optional<Users> findByName(String name);
  
}