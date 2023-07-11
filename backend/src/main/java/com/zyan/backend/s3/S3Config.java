package com.zyan.backend.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import software.amazon.awssdk.auth.credentials.*;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Value("${aws.region}")
    private String awsRegion;
    @Value("${aws.access-key}")
    protected String accessKey;

    @Value("${aws.secret-key}")
    protected String secretKey;

    @Bean
    public S3Client s3Client(){
        System.setProperty("aws.accessKeyId", accessKey);
        System.setProperty("aws.secretAccessKey", secretKey);
        S3Client client = S3Client.builder()
                .region(Region.of(awsRegion))
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
        return client;
    }
}
