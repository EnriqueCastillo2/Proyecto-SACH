package com.ProyectoSACH.aS.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;


@Entity

public class Rooms {
    
    @Id
    private Integer id_Rooms;
    
    @Enumerated(EnumType.STRING)
    private types.typesRooms habitacion;
    
    @Enumerated(EnumType.STRING)
    private types.typesRooms_level nivel;
    
    @Enumerated(EnumType.STRING)
    private types.typesRooms_Status estado;
    
    private Double precio;

    public Rooms() {
    }
    

    public Rooms(Integer id_Rooms, types.typesRooms habitacion, types.typesRooms_level nivel, types.typesRooms_Status estado, Double precio) {
        this.id_Rooms = id_Rooms;
        this.habitacion = habitacion;
        this.nivel = nivel;
        this.estado = estado;
        this.precio = precio;
    }
    
    

    public Integer getId_Rooms() {
        return id_Rooms;
    }

    public void setId_Rooms(Integer id_Rooms) {
        this.id_Rooms = id_Rooms;
    }

    public types.typesRooms getHabitacion() {
        return habitacion;
    }

    public void setHabitacion(types.typesRooms habitacion) {
        this.habitacion = habitacion;
    }

    public types.typesRooms_level getNivel() {
        return nivel;
    }

    public void setNivel(types.typesRooms_level nivel) {
        this.nivel = nivel;
    }

    public types.typesRooms_Status getEstado() {
        return estado;
    }

    public void setEstado(types.typesRooms_Status estado) {
        this.estado = estado;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
    
    
    
    
}
