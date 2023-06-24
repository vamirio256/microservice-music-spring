package com.zyan.backend.s3;

import org.springframework.core.io.InputStreamResource;

public interface S3Service {
    void putObject(String bucketName, String key, byte[] file);

    byte[] getObject(String bucketName, String key) ;
    void deleteObject(String bucketName, String key);
    InputStreamResource streamObject(String bucketName, String key);
}
