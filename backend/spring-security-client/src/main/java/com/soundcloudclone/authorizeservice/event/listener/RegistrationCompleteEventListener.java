package com.soundcloudclone.authorizeservice.event.listener;

import com.soundcloudclone.authorizeservice.entity.User;
import com.soundcloudclone.authorizeservice.event.RegistrationCompleteEvent;
import com.soundcloudclone.authorizeservice.service.AuthorizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

    @Autowired
    private AuthorizeService authorizeService;

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        //Create Verification Token for the User
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        authorizeService.saveVerificationTokenForUser(token, user);
        //Send Mail to user
        String url = event.getApplicationUrl() + "/verifyRegistration?token=" + token;
        //sendVerificationEmail()
        log.info("Click the link to verify your account: {}", url);
    }
}
