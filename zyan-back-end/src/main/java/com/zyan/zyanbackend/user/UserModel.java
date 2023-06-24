package com.zyan.zyanbackend.user;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserModel {

        private String id;
        private String name;
        private String phoneNumber;
        private String email;

}
