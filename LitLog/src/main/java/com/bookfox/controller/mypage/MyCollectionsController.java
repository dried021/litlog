package com.bookfox.controller.mypage;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.bookfox.model.MyCollectionsDto;
import com.bookfox.service.MyCollectionsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MyCollectionsController {

    private final MyCollectionsService myCollectionsService;

    @GetMapping("/{userId}/collections/created")
    public List<MyCollectionsDto> getCreatedCollections(@PathVariable String userId) {
        return myCollectionsService.getCreatedCollections(userId);
    }

    @GetMapping("/{userId}/collections/liked")
    public List<MyCollectionsDto> getLikedCollections(@PathVariable String userId) {
        return myCollectionsService.getLikedCollections(userId);
    }
}
