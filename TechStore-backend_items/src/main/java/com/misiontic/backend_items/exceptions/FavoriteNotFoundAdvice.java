package com.misiontic.backend_items.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@ResponseBody

public class FavoriteNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(FavoriteNotFoundException.class)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    String EntityNotFoundAdvice(FavoriteNotFoundException ex){
        return ex.getMessage();
    }
}
