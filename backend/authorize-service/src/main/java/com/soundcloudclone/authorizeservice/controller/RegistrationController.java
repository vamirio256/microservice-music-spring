package com.soundcloudclone.authorizeservice.controller;

import com.soundcloudclone.authorizeservice.entity.User;
import com.soundcloudclone.authorizeservice.entity.VerificationToken;
import com.soundcloudclone.authorizeservice.event.RegistrationCompleteEvent;
import com.soundcloudclone.authorizeservice.model.PasswordModel;
import com.soundcloudclone.authorizeservice.model.UserModel;
import com.soundcloudclone.authorizeservice.service.AuthorizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RegistrationController {

    private final AuthorizeService authorizeService;

    private final ApplicationEventPublisher applicationEventPublisher;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserModel userModel, final HttpServletRequest request) {
        User user = authorizeService.registerUser(userModel);
        log.debug("ApplicationEventPublisher instance: {}", applicationEventPublisher);
        applicationEventPublisher.publishEvent(new RegistrationCompleteEvent(
                user,
                applicationUrl(request)
        ));
        return "Success";
    }

    @GetMapping("/verifyRegistration")
    public String verifyRegistration(@RequestParam("token") String token) {
        String result = authorizeService.validateVerificationToken(token);
        if (result.equalsIgnoreCase("valid")) {
            return "User Verifies Successfully";
        }
        return "Bad User";
    }

    @GetMapping("/resendVerifyToken")
    public String resendVerificationToken(@RequestParam("token") String oldToken, HttpServletRequest request) {
        VerificationToken verificationToken = authorizeService.generateNewVerificationToken(oldToken);
        User user = verificationToken.getUser();
        resendVerificationTokenMail(user, applicationUrl(request), verificationToken);
        return "Verification Link Sent";
    }

    private void resendVerificationTokenMail(User user, String applicationUrl, VerificationToken verificationToken) {
        String url = applicationUrl + "/verifyRegistration?token=" + verificationToken.getToken();
        log.info("Click the link to verify your account: {}", url);
    }

    @PostMapping("/resetPassword")
    public String resetPassword(@RequestBody PasswordModel passwordModel, HttpServletRequest request) {
        User user = authorizeService.findUserByEmail(passwordModel.getEmail());
        String url = "";
        if (user != null) {
            String token = UUID.randomUUID().toString();
            authorizeService.createPasswordResetTokenForUser(user, token);
            url = passwordResetTokenMail(user, applicationUrl(request), token);
        }
        return url;
    }

    @PostMapping("/savePassword")
    public String savePassword(@RequestParam("token") String token,
                               @RequestBody PasswordModel passwordModel) {
        String result = authorizeService.validatePasswordResetToken(token);
        if (!result.equalsIgnoreCase("valid")) {
            return "Invalid Token";
        }
        Optional<User> user = authorizeService.getUserByPasswordResetToken(token);
        if(user.isPresent()){
            authorizeService.changePassword(user.get(), passwordModel.getNewPassword());
            return "Password Reset Successfully";
        }else{
            return "Invalid Token";
        }
    }

    @PostMapping("/changePassword")
    public String changePassword(@RequestBody PasswordModel passwordModel){
        User user = authorizeService.findUserByEmail(passwordModel.getEmail());
        if(!authorizeService.checkIfValidOldPassword(user,passwordModel.getOldPassword())){
            return "Invalid Old Password";
        }

        //Save New password
        authorizeService.changePassword(user, passwordModel.getNewPassword());
        return "Password Changed Successfully";
    }

    private String passwordResetTokenMail(User user, String applicationUrl, String token) {
        String url = applicationUrl + "/savePasssword?token=" + token;
        log.info("Clock the link to Reset your Password. {}", url);
        return url;
    }

    private String applicationUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":"
                + request.getServerPort()
                + request.getContextPath();
    }
}
