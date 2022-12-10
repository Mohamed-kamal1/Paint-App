package com.example.Paint.Shapes;

public class Square extends Shape{
    @Override
    public void drawShape(long id, String type, String fill, String border, double[] coordinates) {

        setType("square");
        setId(id);
        setFill(fill) ;
        setBorder(border);
        setX(Math.min(coordinates[0],coordinates[2]));
        setY(Math.min(coordinates[1],coordinates[3]));
        setDim1(Math.abs(coordinates[0]-coordinates[2])); // length
        setDim2(this.dim1);
    }


}
