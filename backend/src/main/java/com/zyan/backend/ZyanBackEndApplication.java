package com.zyan.backend;

import com.zyan.backend.s3.S3Bucket;
import com.zyan.backend.s3.S3Service;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableAsync
public class ZyanBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZyanBackEndApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(
			S3Service s3Service,
			S3Bucket s3Bucket,
			UserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) {
		return args -> {
			// TestBucketUploadAndDownload(s3Service, s3Bucket);
			// ApplyAdmin(userService, passwordEncoder);
		};
	}

	private void ApplyAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		User user = User.builder()
				.username("admin")
				// .email("admin@gmail.com")
				.password(passwordEncoder.encode("admin"))
				// .roles("ADMIN")
				.build();
		userRepository.save(user);

	}

	// private static void TestBucketUploadAndDownload(S3Service s3Service, S3Bucket
	// s3Bucket) {
	// s3Service.putObject(s3Bucket.getCustomer(),"foo","Hello World".getBytes());
	//
	// byte[] obj = s3Service.getObject(s3Bucket.getCustomer(),"foo");
	//
	// System.out.println("Hooray: " + new String(obj));
	// }
}
