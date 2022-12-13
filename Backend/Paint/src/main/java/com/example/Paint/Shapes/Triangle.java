package com.example.Paint.Shapes;

public class Triangle extends Shape{

    @Override
    public void drawShape(long id, String type, String fill, String border, double[] coordinates) {
        setType("triangle");
        setId(id);
        setFill(fill);
        setBorder(border);
        setX(coordinates[0]);
        setY(coordinates[1]);
        setDim1(coordinates[2]);
        setDim2(coordinates[3]);


    }
}
