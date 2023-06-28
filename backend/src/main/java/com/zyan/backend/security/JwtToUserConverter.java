package com.zyan.backend.security;

import com.zyan.backend.user.User;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;

@Component
public class JwtToUserConverter implements Converter<Jwt, UsernamePasswordAuthenticationToken> {

    @Override
    public UsernamePasswordAuthenticationToken convert(Jwt jwt) {
        User user = new User();
        user.setId(Integer.parseInt(jwt.getSubject()));
        return new UsernamePasswordAuthenticationToken(user, jwt, Collections.EMPTY_LIST);
    }

    @Override
    public <U> Converter<Jwt, U> andThen(Converter<? super UsernamePasswordAuthenticationToken, ? extends U> after) {
        return Converter.super.andThen(after);
    }
}
