package com.example.Paint;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.beans.XMLDecoder;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

public class Load {

      public String loadxml(String path){
         HashMap<Long,String[]> load=new HashMap<>();
         try(InputStream f=new FileInputStream(new File(path).getAbsolutePath())) {
            XMLDecoder decoder=new XMLDecoder(f);
            load=(HashMap<Long,String[]>)decoder.readObject();
            decoder.close();
         }catch(IOException ex) {
            ex.printStackTrace();
         }
         System.out.print(load.values());
         UndoRedo un=new UndoRedo();
         un.setUndo(load);
         return un.convertTOJson(load);
      }

      public String loadjson(String path)throws StreamReadException, IOException {
         InputStream getLocalJsonFile = new FileInputStream(path);

         HashMap<Long, String[]> load = new ObjectMapper().readValue(getLocalJsonFile, HashMap.class);
         UndoRedo un = new UndoRedo();
         //un.setUndo(jsonMap);
         return un.convertTOJson(load);
      }

}


