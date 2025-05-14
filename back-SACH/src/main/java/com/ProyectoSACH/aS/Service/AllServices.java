package com.ProyectoSACH.aS.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import org.springframework.stereotype.Service;

@Service
public class AllServices {

    
    private static final String UPLOAD_DIR = "C:/Users/flavi/Videos/SACH/uploads/";

    public static String saveImageFromBase64(String base64Image, Object userId) {
        try {
            // Remover el prefijo si lo tiene (ejemplo: "data:image/png;base64,")
            if (base64Image.contains(",")) {
                base64Image = base64Image.split(",")[1];
            }

            // Decodificar el Base64
            byte[] decodedBytes = Base64.getDecoder().decode(base64Image);

            // Crear la carpeta si no existe
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Crear el nombre del archivo
            String imageFileName = userId.toString()  + ".png"; // Usar userId como nombre del archivo
            File file = new File(directory, imageFileName);

            // Guardar el archivo en el servidor
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(decodedBytes);
                fos.flush();
            }

            // Retornar solo el nombre del archivo, no la ruta completa
            return imageFileName;

        } catch (IOException e) {
            System.out.println("Error al cargar la imagen: " + e.getMessage());
            return null;
        }

}
}