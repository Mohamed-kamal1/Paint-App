package com.example.Paint.Shapes;

public class Circle extends Shape{
//    private double r, area, center_x, center_y;
//    final double PI = 3.14159265359;
//
//    public Circle(double r, double center_x, double center_y){
//        this.r = r;
//        this.center_x = center_x;
//        this.center_y = center_y;
//    }
//
//    public Circle() {
//
//    }
//
//    public double getArea() {
//        area = PI*r*r;
//        return area;
//    }
//
//    public double getR() {
//        return r;
//    }
//
//    public double[] getCenter(){
//		double[] arr = new double[2];
//		arr[0] = center_x;
//		arr[1] = center_y;
//        return arr;
//    }
//
//    public void setR(double r){
//        this.r = r;
//    }
//
//    public void setCenter(double x, double y){
//        this.center_x = x;
//        this.center_y = y;
//    }
public void drawShape(long id, String type, String fill, String border, double[] coordinates) {

    setType("circle");
    setId(id);
    setFill(fill);
    setBorder(border);
    setX(Math.abs(coordinates[0]+coordinates[2])/2);//center Xcoordinate
    setY(Math.abs(coordinates[1]+coordinates[3])/2);//center Ycoordinate
    setDim1(Math.abs(coordinates[2]-coordinates[0])/2); // radius
    setDim2(0);
}



}
