package com.example.Paint;

import com.example.Paint.Shapes.Shape;
import com.example.Paint.Shapes.ShapeFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/back")
public class Controller {
    @GetMapping("/shape")
    public void control (@RequestParam long id, @RequestParam String type, @RequestParam String fill, @RequestParam String border, @RequestParam long[] coordinates){

        ShapeFactory factory =new ShapeFactory();
        Shape shape=factory.createShape(type);
//        UndoRedo un=new UndoRedo();
        shape.drawShape(id, type,fill, border,coordinates);
//        un.addShape(shape);
    }
}
