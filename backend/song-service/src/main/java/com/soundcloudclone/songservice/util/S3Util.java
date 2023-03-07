package com.soundcloudclone.songservice.util;

import com.soundcloudclone.songservice.config.S3Config;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
public class S3Util {
    private static String BUCKET;
    private static S3Client s3Client;

    public S3Util(@Value("${aws.s3.bucket}") String bucket) {
        BUCKET = bucket;
    }

    @Autowired
    public void setS3Client(S3Client s3ClientBuilder) {
        S3Util.s3Client = s3ClientBuilder;
    }

    public static String uploadFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        PutObjectResponse response = s3Client
                .putObject(
                        PutObjectRequest.builder()
                                .bucket(BUCKET)
                                .key(fileName)
                                .contentType(file.getContentType())
                                .contentLength(file.getSize())
                                .build(),
                        RequestBody.fromBytes(file.getBytes())
                );
        log.info(response.toString());
        return "https://" + BUCKET + "s3.amazonaws.com/" + fileName;
    }
}
