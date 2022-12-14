package com.example.Paint;

import java.util.HashMap;
import java.io.IOException;
import com.example.Paint.Shapes.Shape;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UndoRedo {

    public static HashMap<Long,String[]> undo=new HashMap<>();
    public static HashMap<Long,String[]> redo=new HashMap<>();

    public  HashMap<Long,String[]> getUndo(){
        return undo;
    }

    public  void setUndo(HashMap<Long,String[]> undo){
        UndoRedo.undo =undo;
    }


    public HashMap<Long,String[]> undo() {

        int length = undo.size();
//        System.out.println(undo.keySet() + "Canaan");

        Long[] keys = undo.keySet().toArray(new Long[length]);

        redo.put(keys[length - 1],undo.get(keys[length - 1]));
        undo.remove(keys[length - 1]);

        return undo;
    }
    //used to add every shape in the undo hashmap to be stored it's parameter the shape every shape entered
    public void addShape(Shape shape){
        //the undo stack has all the drawings
        String[] s=new String[7];
        s[0]=shape.getType();
        s[1]=shape.getFill();
        s[2]=shape.getBorder();
        s[3]=String.valueOf(shape.getX());
        s[4]=String.valueOf(shape.getY());
        s[5]=String.valueOf(shape.getDim1());
        s[6]=String.valueOf(shape.getDim2());
        undo.put(shape.getId(),s);
//        System.out.println(undo +" 5eer");

    }
    //to convert our hashmap to json to be send to the front in form of json
    public String convertTOJson (HashMap<Long,String[]>map){
        ObjectMapper mapper = new ObjectMapper();
        String json="";
        try
        {//Convert Map to JSON
            json = mapper.writeValueAsString(map);
            //Print JSON output

        } catch (IOException e) {
            e.printStackTrace();
        }
        return json;
    }

    public static HashMap<Long, String[]> Redo() {
        int length = redo.keySet().size();
        if(!redo.isEmpty()) {
            Long[] keys = redo.keySet().toArray(new Long[length]);
            long[] b = new long[length];
            int j = length;
            for (int i = 0; i < length; i++) {
                b[j - 1] = keys[i];
                j--;
            }
            for (int i = 0; i < length; i++) {
                keys[i] = b[i];
            }
            undo.put(keys[length-1], redo.get(keys[length-1]));

            redo.remove(keys[length-1]);
        }

        return undo;
    }
    //these clears functions used to clear our hashmap
    public static void clearRedo (){
        redo.clear();
    }
    public static void clearUndo (){
        undo.clear();
    }

}