package com.zyan.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class EmailAlreadyExistException extends RuntimeException{
    public EmailAlreadyExistException(String message){
        super(message);
    }
    public EmailAlreadyExistException(){
        super("Email already exist");
    }
}
