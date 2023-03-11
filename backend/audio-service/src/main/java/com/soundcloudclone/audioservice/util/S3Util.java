package com.soundcloudclone.audioservice.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Util {
    //    private static String BUCKET;
//    private static String REGION;
//    public S3Util(@Value("${aws.s3.bucket}") String bucket, @Value("${aws.s3.region}") String region) {
//        BUCKET = bucket;
//        REGION = region;
//    }
    private final S3Client s3Client;
    private final GetObjectRequest.Builder getObjectRequestBuilder;
    private final PutObjectRequest.Builder putObjectRequestBuilder;

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString();
        PutObjectResponse response = s3Client
                .putObject(
                        putObjectRequestBuilder
                                .key(fileName)
                                .contentType(file.getContentType())
                                .contentLength(file.getSize())
                                .build(),
                        RequestBody.fromBytes(file.getBytes())
                );
        return fileName;
    }

    public byte[] streamFile(String objectURL) {
        GetObjectRequest getObjectRequest = getObjectRequestBuilder
                .key(objectURL)
                .build();
        ResponseBytes<GetObjectResponse> objectResponse = s3Client.getObjectAsBytes(getObjectRequest);
        return objectResponse.asByteArray();
    }
}
