package com.example.Paint.Shapes;

public class Circle extends Shape{
    private double r, area, center_x, center_y;
    final double PI = 3.14159265359;

    public Circle(double r, double center_x, double center_y){
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
		double[] arr = new double[2];
		arr[0] = center_x;
		arr[1] = center_y;
        return arr;
    }

    public void setR(double r){
        this.r = r;
    }

    public void setCenter(double x, double y){
        this.center_x = x;
        this.center_y = y;
    }


}
