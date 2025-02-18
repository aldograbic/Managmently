package com.project.Managmently.controllers.auth;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.Managmently.classes.User;
import com.project.Managmently.config.EmailService;
import com.project.Managmently.repositories.user.UserRepository;

@Controller
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;
    
    @GetMapping("/registration")
    public String getFeaturesPage() {
        return "auth/registration";
    }

    @PostMapping("/processRegistration")
    public String processRegistration(@ModelAttribute User user, @RequestParam("confirmPassword") String confirmPassword ,RedirectAttributes redirectAttributes) {

        User existingUserEmail = userRepository.findByEmail(user.getEmail());
        if (existingUserEmail != null) {
            redirectAttributes.addFlashAttribute("errorMessage", "User already exists with the same e-mail address. Please try again.");
            return "redirect:/registration";
        }

        User existingUserUsername = userRepository.findByUsername(user.getUsername());
        if (existingUserUsername != null) {
            redirectAttributes.addFlashAttribute("errorMessage", "User already exists with the same username. Please try again.");
            return "redirect:/registration";
        }
        
        if (!user.getPassword().equals(confirmPassword)) {
            redirectAttributes.addFlashAttribute("errorMessage", "Passwords must match in order to register. Please try again.");
            return "redirect:/registration";
        }
        
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        String token = UUID.randomUUID().toString();
        user.setConfirmationToken(token);
        user.setEmailVerified(false);

        userRepository.saveUser(user);

        String confirmationLink = "http://localhost:8080/confirm?token=" + token;
        emailService.sendMessage(user.getEmail(), "Confirm your e-mail address - Managmently", "Hello, " + user.getFirstName() + "!\nWe are happy to see you want to join us!\nWe just need one more thing to get you going... for you to click the link below to confirm your e-mail address!\nConfirmation link: " + confirmationLink);
        redirectAttributes.addFlashAttribute("successMessage", "Please check your e-mail inbox for instructions to confirm your e-mail address.");

        return "redirect:/";
    }

    @GetMapping("/confirm")
    public String confirmEmail(@RequestParam("token") String token, RedirectAttributes redirectAttributes) {
        User user = userRepository.findByConfirmationToken(token);
        if (user == null) {
            redirectAttributes.addFlashAttribute("errorMessage", "Invalid e-mail address verification token.");
            return "redirect:/";
        }

        if (user.isEmailVerified()) {
            redirectAttributes.addFlashAttribute("success", "E-mail address is already confirmed.");
            return "redirect:/";
        }

        user.setEmailVerified(true);
        userRepository.updateEmailVerification(user);

        redirectAttributes.addFlashAttribute("successMessage", "You have successfully verified your e-mail address. Now you can log in to Managmently!");

        return "redirect:/";
    }
}
