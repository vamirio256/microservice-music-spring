package com.zyan.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class MethodArgumentTypeMismatchException extends RuntimeException{
    public MethodArgumentTypeMismatchException(String message){
        super(message);
    }
}
