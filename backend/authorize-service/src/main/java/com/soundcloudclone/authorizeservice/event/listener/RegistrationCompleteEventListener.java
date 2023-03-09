package com.soundcloudclone.authorizeservice.event.listener;

import com.soundcloudclone.authorizeservice.entity.User;
import com.soundcloudclone.authorizeservice.event.RegistrationCompleteEvent;
import com.soundcloudclone.authorizeservice.service.AuthorizeService;
import org.springframework.context.ApplicationListener;

import java.util.UUID;

public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

    private AuthorizeService authorizeService;

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        //Create Verification Token for the User
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        authorizeService.saveVerificationTokenForUser(token,user);
        //Send Mail to user
    }
}
