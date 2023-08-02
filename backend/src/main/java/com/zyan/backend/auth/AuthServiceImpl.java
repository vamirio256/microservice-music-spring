package com.zyan.backend.auth;

import com.zyan.backend.exception.ResourceNotFoundException;
import com.zyan.backend.security.jwt.JwtUtils;
import com.zyan.backend.user.UserRole;
import com.zyan.backend.user.entities.Profile;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.repositories.ProfileRepository;
import com.zyan.backend.user.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityExistsException;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProfileRepository profileRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final JavaMailSender mailSender;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            ProfileRepository profileRepository, AuthenticationManager authenticationManager,
            JwtUtils jwtUtils, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.profileRepository = profileRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.mailSender = mailSender;
    }

    @Override
    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        // Check user email and password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        //process if succeeded
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User with email '%s' not found".formatted(request.getEmail())));

        var jwtToken = jwtUtils.generateToken(user);
        return AuthResponseDTO.builder()
                .user(user.mapUserToUserDTO(user.getProfile().getId()))
                .jwtToken(jwtToken)
                .build();
    }

    @Override
    public void register(RegisterRequestDTO request, String siteUrl) throws MessagingException, UnsupportedEncodingException {
        Optional<User> existUser = userRepository.findByEmail(request.getEmail());
        if (existUser.isPresent()) {
            throw new EntityExistsException("User with email '%s' already exist".formatted(request.getEmail()));
        }

        String randomCode = RandomString.make(64);

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .enabled(false)
                .avatarUrl("https://vamirio-soundcloud-clone.s3.ap-southeast-1.amazonaws.com/user-avatar/user_avatar.jpg")
                .verificationCode(randomCode)
                .build();
        Profile profile = Profile.builder()
                .user(user)
                .build();
        user.setProfile(profile);
        userRepository.save(user);

        sendVerificationEmail(user, siteUrl);
    }

    @Override
    public void sendVerificationEmail(User user, String siteUrl) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "nguyenquocquan.nbk.9a5@gmail.com";
        String senderName = "Soundcloud Clone";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Soundcloud Clone.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = siteUrl + "/auth/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    @Override
    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);

            return true;
        }
    }
}
