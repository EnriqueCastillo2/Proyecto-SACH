package com.ProyectoSACH.aS.Repository;

import com.ProyectoSACH.aS.Model.Huespedes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HuespedRepository extends JpaRepository<Huespedes,String> {
    
}
