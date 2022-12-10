package com.example.Paint.Shapes;

public class Ellipse extends Shape{
//    private double minor_axis, major_axis, center_x, center_y, area;
//    final double PI = 3.14159265359;
//
//    public Ellipse(double minor_axis, double major_axis, double center_x, double center_y){
//        this.minor_axis = minor_axis;
//        this.major_axis = major_axis;
//        this.center_x = center_x;
//        this.center_y = center_y;
//    }
//
//    public Ellipse() {
//
//    }
//
//    public void setCenter(double center_x, double center_y) {
//        this.center_x = center_x;
//        this.center_y = center_y;
//    }
//
//    public void setMinor_axis(double minor_axis){
//        this.minor_axis = minor_axis;
//    }
//
//    public void setMajor_axis(double major_axis){
//        this.major_axis = major_axis;
//    }
//
//    public double getArea(){
//        area = PI*(this.minor_axis/2)*(this.major_axis/2);
//        return area;
//    }
//
//    public double[] getCenter(){
//		double[] arr = new double[2];
//		arr[0] = center_x;
//		arr[1] = center_y;
//        return arr;
//    }
//
//    public double getMajor_axis() {
//        return major_axis;
//    }
//
//    public double getMinor_axis() {
//        return minor_axis;
//    }

    @Override
    public void drawShape(long id, String type, String fill, String border, double[] coordinates) {
        setType("ellipse");
        setId(id);
        setFill(fill);
        setBorder(border);
        setX(Math.abs(coordinates[0]+coordinates[2])/2); //center Xcoordinate
        setY(Math.abs(coordinates[1]+coordinates[3])/2);// center Ycoordinate
        //radiusx(minor & major)
        setDim1(Math.abs(coordinates[2]-coordinates[0])/2);
        setDim2(Math.abs(coordinates[3]-coordinates[1])/2);
    }
}
