package com.misiontic.backend_items.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
@ResponseBody
public class InsufficientStockAdvice {
    @ResponseBody
    @ExceptionHandler(InsufficientStockException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String InsufficientStockAdvice(InsufficientStockException ex){
        return ex.getMessage();
    }
}
