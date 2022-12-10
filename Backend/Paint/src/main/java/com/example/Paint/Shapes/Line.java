package com.example.Paint.Shapes;

public class Line extends Shape{
//    private double length, startPoint_x, startPoint_y, endPoint_x, endPoint_y, slope;
//
//    public Line(double startPoint_x, double startPoint_y, double endPoint_x, double endPoint_y){
//        this.startPoint_x = startPoint_x;
//        this.startPoint_y = startPoint_y;
//        this.endPoint_x = endPoint_x;
//        this.endPoint_y = endPoint_y;
//    }
//
//    public Line() {
//
//    }
//
//    public void setEndPoint(double endPoint_x, double endPoint_y) {
//        this.endPoint_x = endPoint_x;
//        this.endPoint_y = endPoint_y;
//    }
//
//    public void setStartPoint(double startPoint_x, double startPoint_y) {
//        this.startPoint_x = startPoint_x;
//        this.startPoint_y = startPoint_y;
//    }
//
//    public double getLength() {
//        double x_dif = this.startPoint_x-this.endPoint_x;
//        double y_dif = this.startPoint_y-this.endPoint_y;
//        this.length = Math.sqrt(x_dif*x_dif+y_dif*y_dif);
//        return length;
//    }
//
//    public double getSlope() {
//        double x_dif = this.startPoint_x-this.endPoint_x;
//        double y_dif = this.startPoint_y-this.endPoint_y;
//        if(x_dif == 0) slope = Double.POSITIVE_INFINITY;
//        else slope = y_dif/x_dif;
//        return slope;
//    }
//
//    public double[] getStartPoint() {
//		double[] arr = new double[2];
//		arr[0] = startPoint_x;
//		arr[1] = startPoint_y;
//        return arr;
//    }
//
//    public double[] getEndPoint(){
//		double[] arr = new double[2];
//		arr[0] = endPoint_x;
//		arr[1] = endPoint_y;
//        return arr;
//    }

    @Override
    public void drawShape(long id, String type, String fill, String border, double[] coordinates) {
        setType("line");
        setId(id);
        setFill(fill);
        setBorder(border);
        setX(Math.min(coordinates[0],coordinates[2]));
        setY(Math.min(coordinates[1],coordinates[3]));

        double x_dif = coordinates[0]- coordinates[2];
        double y_dif = coordinates[1] - coordinates[3];
        double length = (Math.sqrt(x_dif*x_dif+y_dif*y_dif));
        setDim1(length); // length
        setDim2(dim1); //
    }
}
