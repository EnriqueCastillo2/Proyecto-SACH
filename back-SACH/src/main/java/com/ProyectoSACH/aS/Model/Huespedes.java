package com.ProyectoSACH.aS.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
public class Huespedes {
    @Id
    private String idHuesped;
    
    @NotNull
    @Column(nullable = false)
    private String nameHuesped;
    @NotNull
    @Column(nullable = false)
    private String apellidoHuesped;
    
    @NotNull
    @Column(nullable = false)
    @Size(min = 8, max = 8, message = "El número de teléfono debe tener exactamente 8 dígitos.")
    private String telefono;

    @NotNull
    @Column(nullable = false)
    private Integer numPersonas;
    
    @NotNull
    @Column(nullable = false)
    private Double monto;

    @NotNull
    @Column(nullable = false)
    private String statusHuesped;
    
    
    @NotNull
    @Column(nullable=false)
    private LocalDateTime fechaRegistro;
    
    
    @NotNull
    @Column(nullable=false)
    private LocalDateTime fechaSalida;
    
    
    
    @ManyToOne(targetEntity = Users.class)
    @JoinColumn(name = "id_users", nullable = false, referencedColumnName = "id_users")
   
    private Users usuarioRegistrador;

    // Relación con Rooms (Un huésped ocupa una única habitación)
    @ManyToOne(targetEntity = Rooms.class)
    @JoinColumn(name = "id_Rooms", nullable = false, referencedColumnName = "id_Rooms")
    private Rooms habitacionAsignada;
    
    
    public Huespedes() {
    }

    public Huespedes(String idHuesped, String nameHuesped, String apellidoHuesped, String telefono, Integer numPersonas, Double monto, String statusHuesped, LocalDateTime fechaRegistro, LocalDateTime fechaSalida, Users usuarioRegistrador, Rooms habitacionAsignada) {
        this.idHuesped = idHuesped;
        this.nameHuesped = nameHuesped;
        this.apellidoHuesped = apellidoHuesped;
        this.telefono = telefono;
        this.numPersonas = numPersonas;
        this.monto = monto;
        this.statusHuesped = statusHuesped;
        this.fechaRegistro = fechaRegistro;
        this.fechaSalida = fechaSalida;
        this.usuarioRegistrador = usuarioRegistrador;
        this.habitacionAsignada = habitacionAsignada;
    }

  



    public String getIdHuesped() {
        return idHuesped;
    }

    public void setIdHuesped(String idHuesped) {
        this.idHuesped = idHuesped;
    }

    public String getNameHuesped() {
        return nameHuesped;
    }

    public void setNameHuesped(String nameHuesped) {
        this.nameHuesped = nameHuesped;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public LocalDateTime getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(LocalDateTime fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public String getApellidoHuesped() {
        return apellidoHuesped;
    }

    public void setApellidoHuesped(String apellidoHuesped) {
        this.apellidoHuesped = apellidoHuesped;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Integer getNumPersonas() {
        return numPersonas;
    }

    public void setNumPersonas(Integer numPersonas) {
        this.numPersonas = numPersonas;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getStatusHuesped() {
        return statusHuesped;
    }

    public void setStatusHuesped(String statusHuesped) {
        this.statusHuesped = statusHuesped;
    }

    public Users getUsuarioRegistrador() {
        return usuarioRegistrador;
    }

    public void setUsuarioRegistrador(Users usuarioRegistrador) {
        this.usuarioRegistrador = usuarioRegistrador;
    }

    public Rooms getHabitacionAsignada() {
        return habitacionAsignada;
    }

    public void setHabitacionAsignada(Rooms habitacionAsignada) {
        this.habitacionAsignada = habitacionAsignada;
    }
    
    
    
}
