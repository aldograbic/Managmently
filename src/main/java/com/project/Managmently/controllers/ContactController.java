package com.project.Managmently.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.Managmently.config.EmailService;
import com.project.Managmently.repositories.user.UserRepository;

@Controller
public class ContactController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Value("${spring.mail.username}")
    private String ownerEmail;
    
    @GetMapping("/contact")
    public String getContactPage() {
        return "contact";
    }

    @PostMapping("/processContactUs")
    public String processContactUs(@RequestParam("name") String name, 
                                @RequestParam("email") String email, 
                                @RequestParam("message") String message, 
                                RedirectAttributes redirectAttributes) {

         try {
            userRepository.contact(name, email, message);
            emailService.sendMessage(ownerEmail, "New contact message from " + name, "User e-mail: " + email + "\nMessage: " + message);

            redirectAttributes.addFlashAttribute("successMessage", "Your message has been submitted successfully.");

         } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "There was an issue with sending your message. Please try again.");
            return "redirect:/contact";
         }
         
         return "redirect:/";
    }
}
