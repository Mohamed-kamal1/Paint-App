package com.example.Paint.Shapes;

public class ShapeFactory {
    public Shape createShape(String type) {

        if (type.equalsIgnoreCase("circle")) return new Circle();
        else if (type.equalsIgnoreCase("ellipse")) return new Ellipse();
        else if (type.equalsIgnoreCase("rectangle")) return new Rectangle();
        else if (type.equalsIgnoreCase("square")) return new Square();
        else if (type.equalsIgnoreCase("triangle")) return new Triangle();
        else if (type.equalsIgnoreCase("line")) return new Line();
        else throw new RuntimeException("Invalid Shape Type");
    }
}
