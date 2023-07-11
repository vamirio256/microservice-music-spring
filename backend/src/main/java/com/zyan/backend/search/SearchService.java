package com.zyan.backend.search;

import java.util.Objects;
import java.util.concurrent.CompletableFuture;

public interface SearchService {
    CompletableFuture<SearchResponseDTO> search(String query);
}
