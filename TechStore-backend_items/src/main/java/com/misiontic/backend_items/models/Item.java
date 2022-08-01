package com.misiontic.backend_items.models;

import org.springframework.data.annotation.Id;

public class Item {

    @Id
    private Integer ref;
    private String name;
    private String category;
    private Integer price;
    private Integer inStock;
    private String warranty;
    private String details;
    private String image;

    public Item(Integer ref, String name, String category, Integer price, Integer inStock, String warranty,
                String details, String image){
        this.ref = ref;
        this.name = name;
        this.category = category;
        this.price  = price;
        this.inStock = inStock;
        this.warranty = warranty;
        this.details = details;
        this.image = image;
    }

    public Integer getRef(){
        return ref;
    }

    public String getName(){
        return name;
    }

    public String getCategory() {
        return category;
    }

    public Integer getPrice() {
        return price;
    }

    public Integer getInStock() {
        return inStock;
    }

    public String getWarranty() {
        return warranty;
    }

    public String getDetails() {
        return details;
    }

    public String getImage() { return image; }

    public void setRef(Integer ref) {
        this.ref = ref;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setInStock(Integer inStock) {
        this.inStock = inStock;
    }

    public void setWarranty(String warranty) {
        this.warranty = warranty;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public void setImage(String image){ this.image = image; }
}
