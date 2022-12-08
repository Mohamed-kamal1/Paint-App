package com.example.Paint.Shapes;

public class Elipse extends Shape{
    private double minor_axis, major_axis, center_x, center_y, area;
    final double PI = 3.14159265359;

    public Elipse(double minor_axis, double major_axis, double center_x, double center_y){
        this.minor_axis = minor_axis;
        this.major_axis = major_axis;
        this.center_x = center_x;
        this.center_y = center_y;
    }

    public void setCenter(double center_x, double center_y) {
        this.center_x = center_x;
        this.center_y = center_y;
    }

    public void setMinor_axis(double minor_axis){
        this.minor_axis = minor_axis;
    }

    public void setMajor_axis(double major_axis){
        this.major_axis = major_axis;
    }

    public double getArea(){
        area = PI*(this.minor_axis/2)*(this.major_axis/2);
        return area;
    }

    public double[] getCenter(){
		double[] arr = new double[2];
		arr[0] = center_x;
		arr[1] = center_y;
        return arr;
    }

    public double getMajor_axis() {
        return major_axis;
    }

    public double getMinor_axis() {
        return minor_axis;
    }
}
