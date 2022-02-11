package com.misiontic.backend_items.models;

import org.springframework.data.annotation.Id;

import javax.annotation.processing.Generated;
import java.util.Date;

public class Favorite {

    @Id
    private String  id;
    private String  username;
    private Integer prodRef;
    private String  prodName;
    private String  prodCategory;
    private Integer prodPrice;
    private Integer prodUnits;
    private Date    date;
    private String  image;

    public Favorite(String id, String username, Integer prodRef, String prodName, String prodCategory,
                    Integer prodPrice, Date date, Integer prodUnits, String image){
        this.id             = id;
        this.username       = username;
        this.prodRef        = prodRef;
        this.prodName       = prodName;
        this.prodCategory   = prodCategory;
        this.prodPrice      = prodPrice;
        this.prodUnits      = prodUnits;
        this.date           = date;
        this.image          = image;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getProdRef() {
        return prodRef;
    }

    public void setProdRef(Integer prodRef) {
        this.prodRef = prodRef;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public String getProdCategory() {
        return prodCategory;
    }

    public void setProdCategory(String prodCategory) {
        this.prodCategory = prodCategory;
    }

    public Integer getProdPrice() {
        return prodPrice;
    }

    public void setProdPrice(Integer prodPrice) {
        this.prodPrice = prodPrice;
    }

    public Integer getProdUnits() {
        return prodUnits;
    }

    public void setProdUnits(Integer prodUnits) {
        this.prodUnits = prodUnits;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
