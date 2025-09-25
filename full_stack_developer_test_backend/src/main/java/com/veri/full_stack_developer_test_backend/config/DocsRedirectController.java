package com.veri.full_stack_developer_test_backend.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DocsRedirectController {
    @GetMapping("/")
    public String index() {
        return "redirect:/swagger-ui/index.html";
    }
}