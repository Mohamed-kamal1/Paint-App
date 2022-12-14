package com.example.Paint;


import com.fasterxml.jackson.databind.ObjectMapper;

import java.beans.XMLEncoder;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;

public class Save {

    public void savexml(String path) {
        UndoRedo un = new UndoRedo();
        try (FileOutputStream f = new FileOutputStream(new File(path).getAbsolutePath())) {
            XMLEncoder encoder = new XMLEncoder(f);
            encoder.writeObject(un.getUndo());
            un.clearUndo();
            un.clearRedo();
            encoder.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
    public void savejson(String path){
        ObjectMapper mapper = new ObjectMapper();
        UndoRedo un=new UndoRedo();
        try {
            String json = mapper.writeValueAsString(un.getUndo());
            un.clearUndo();
            un.clearRedo();
            FileWriter writer = new FileWriter(path);
            writer.write(json);
            writer.flush();
            writer.close();
        }catch (IOException e) {
            e.printStackTrace();
        }

    }
}

