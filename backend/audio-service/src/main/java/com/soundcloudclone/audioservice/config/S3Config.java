package com.soundcloudclone.audioservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;


@Configuration
public class S3Config {

    @Value("${aws.access.key}")
    private String accessKey;

    @Value("${aws.secret.key}")
    private String secretKey;

    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws.s3.bucket}")
    private String bucket;

    @Bean
    public GetObjectRequest.Builder getObjectRequestBuilder() {
        return GetObjectRequest.builder()
                .bucket(bucket);
    }

    @Bean
    public PutObjectRequest.Builder putObjectRequestBuilder() {
        return PutObjectRequest.builder()
                .bucket(bucket);
    }

    @Bean
    public S3Client s3ClientBuilder() {
        AwsCredentials awsCredentials = AwsBasicCredentials.create(accessKey, secretKey);
        Region awsRegion = Region.of(region);
        return S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .region(awsRegion)
                .build();
    }
}
