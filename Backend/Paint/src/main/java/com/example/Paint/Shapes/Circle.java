package com.example.Paint.Shapes;

public class Circle extends Shape{
    private double r, area, center_x, center_y;
    final double PI = 3.14159265359;

    public void Circle(double r, double center_x, double center_y){
        this.r = r;
        this.center_x = center_x;
        this.center_y = center_y;
    }

    public double getArea() {
        area = PI*r*r;
        return area;
    }

    public double getR() {
        return r;
    }

    public double[] getCenter(){
        return {this.x, this.y};
    }

    public void setR(double r){
        this.r = r;
    }

    public void setCenter(double x, double y){
        this.x = x;
        this.y = y;
    }


}
