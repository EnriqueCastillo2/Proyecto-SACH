package com.ProyectoSACH.aS.Repository;

import com.ProyectoSACH.aS.Model.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomsRepository extends JpaRepository<Rooms,Integer> {
    
  
}