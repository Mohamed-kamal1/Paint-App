package com.example.Paint;


import com.example.Paint.Shapes.Shape;
import com.example.Paint.Shapes.ShapeFactory;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.web.bind.annotation.*;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.*;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/back")
public class Controller {
    @GetMapping("/shape")
    public void control (@RequestParam long id, @RequestParam String type, @RequestParam String fill, @RequestParam String border, @RequestParam double[] coordinates){

        ShapeFactory factory =new ShapeFactory();
        Shape shape=factory.createShape(type);
        UndoRedo un=new UndoRedo();
        shape.drawShape(id, type,fill, border,coordinates);
        un.addShape(shape);
    }

    @GetMapping("/undo")
    public String UNDO(@RequestParam int undo) {

        UndoRedo un=new UndoRedo();
        if(undo==1){
            un.clearRedo();
            un.clearUndo();
            return "{}";
        }
        //return value of hashmap undo to front to draw

        return un.convertTOJson(un.undo());
    }

    @GetMapping("/redo")
    public String REDO(@RequestParam int redo) {

        UndoRedo un=new UndoRedo();
        if(redo==0){
            un.clearRedo();
        }
        return un.convertTOJson( un.Redo());
    }


}
