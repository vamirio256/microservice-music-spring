package com.zyan.backend.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VNPayResponseDTO implements Serializable {
    private String status;
    private String message;
    private String URL;
}
