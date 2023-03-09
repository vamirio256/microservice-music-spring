package com.soundcloudclone.authorizeservice.controller;

import com.soundcloudclone.authorizeservice.entity.User;
import com.soundcloudclone.authorizeservice.event.RegistrationCompleteEvent;
import com.soundcloudclone.authorizeservice.model.UserModel;
import com.soundcloudclone.authorizeservice.service.AuthorizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RegistrationController {

    private final AuthorizeService authorizeService;

    private ApplicationEventPublisher applicationEventPublisher;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserModel userModel) {
        User user = authorizeService.registerUser(userModel);
        applicationEventPublisher.publishEvent(new RegistrationCompleteEvent(
                user,
                "url"
        ));
        return "Success";
    }
}
