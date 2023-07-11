package com.zyan.backend.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class MethodArgumentTypeMismatchException extends RuntimeException{
    public MethodArgumentTypeMismatchException(String message){
        super(message);
    }
}
