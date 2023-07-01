package com.zyan.backend;

import com.zyan.backend.s3.S3Bucket;
import com.zyan.backend.s3.S3Service;
import com.zyan.backend.user.User;
import com.zyan.backend.user.UserManager;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ZyanBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZyanBackEndApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner runner(
			S3Service s3Service,
			S3Bucket s3Bucket,
			UserManager userManager,
            PasswordEncoder passwordEncoder
	){
		return args -> {
//			TestBucketUploadAndDownload(s3Service, s3Bucket);
//			ApplyAdmin(userService, passwordEncoder);
		};
	}

	private void ApplyAdmin(UserManager userManager, PasswordEncoder passwordEncoder) {
		User user = User.builder()
				.name("admin")
//				.email("admin@gmail.com")
				.password(passwordEncoder.encode("admin"))
//				.roles("ADMIN")
				.build();
		userManager.createUser(user);
	}

	private static void TestBucketUploadAndDownload(S3Service s3Service, S3Bucket s3Bucket) {
		s3Service.putObject(s3Bucket.getCustomer(),"foo","Hello World".getBytes());

		byte[] obj = s3Service.getObject(s3Bucket.getCustomer(),"foo");

		System.out.println("Hooray: " + new String(obj));
	}
}
