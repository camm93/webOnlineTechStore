package com.misiontic.backend_items.exceptions;

public class FavoriteNotFoundException extends RuntimeException{
    public FavoriteNotFoundException(String message){
        super(message);
    }
}
