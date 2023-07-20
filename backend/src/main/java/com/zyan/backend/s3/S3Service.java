package com.zyan.backend.s3;

import org.springframework.core.io.InputStreamResource;

import java.io.IOException;
import java.io.InputStream;

public interface S3Service {

    void putObject(String bucketName, String key, String contentType, InputStream file) throws IOException;

    byte[] getObject(String bucketName, String key) ;
    void deleteObject(String bucketName, String key);
    InputStreamResource streamObject(String bucketName, String key);
}
